import { beforeEach, describe, expect, it, vi } from 'vitest';

const { evalMock, RedisMock } = vi.hoisted(() => {
  const evalMock = vi.fn();
  const RedisMock = vi.fn(function () {
    return { eval: evalMock };
  });
  return { evalMock, RedisMock };
});
vi.mock('@upstash/redis', () => ({ Redis: RedisMock }));
import app from '../src/app.js';
import { incrementProfileViews, renderProfileViews } from '../src/services/views.js';
import { themes } from '../src/utils/themes.js';

beforeEach(() => {
  process.env['UPSTASH_REDIS_REST_URL'] = 'https://redis.example.test';
  process.env['UPSTASH_REDIS_REST_TOKEN'] = 'synthetic-test-token';
  delete process.env['KV_REST_API_URL'];
  delete process.env['KV_REST_API_TOKEN'];
  evalMock.mockReset();
  RedisMock.mockClear();
});

describe('profile view badge', () => {
  it('counts each GET using case insensitive keys and no caching', async () => {
    let count = 0;
    evalMock.mockImplementation(async (_script, keys) =>
      keys[0] === 'profile-views:v2' ? ++count : 0
    );
    const responses = await Promise.all(
      Array.from({ length: 20 }, () => app.request('/profile/NayanDas69'))
    );
    const bodies = await Promise.all(responses.map((r) => r.text()));
    expect(new Set(bodies).size).toBe(20);
    expect(evalMock).toHaveBeenCalledTimes(40);
    expect(evalMock).toHaveBeenCalledWith(expect.any(String), ['profile-views:v1:nayandas69'], []);
    expect(evalMock).toHaveBeenCalledWith(
      expect.any(String),
      ['profile-views:v2'],
      ['nayandas69', 100000]
    );
    for (const response of responses) {
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('image/svg+xml');
      for (const header of ['cache-control', 'cdn-cache-control', 'vercel-cdn-cache-control']) {
        expect(response.headers.get(header)).toContain('no-store');
      }
    }
    expect(RedisMock).toHaveBeenCalledWith(
      expect.objectContaining({ retry: { retries: 0 }, signal: expect.any(Function) })
    );
  });

  it('continues existing legacy counters without creating a new hash field', async () => {
    evalMock.mockResolvedValueOnce(42);
    expect(await incrementProfileViews('NayanDas69')).toBe(42);
    expect(evalMock).toHaveBeenCalledTimes(1);
  });

  it('does not increment on HEAD or OPTIONS probes', async () => {
    const head = await app.request('/profile/nayandas69', { method: 'HEAD' });
    expect(head.status).toBe(200);
    expect(await head.text()).toBe('');
    expect((await app.request('/profile/nayandas69', { method: 'OPTIONS' })).status).toBe(204);
    expect(evalMock).not.toHaveBeenCalled();
  });

  it.each(['-bad', 'bad-', 'bad--name', 'bad_name', 'a'.repeat(40), '%3Cscript%3E'])(
    'rejects invalid username %s before storage',
    async (name) => {
      expect((await app.request(`/profile/${name}`)).status).toBe(400);
      expect(evalMock).not.toHaveBeenCalled();
    }
  );

  it('renders a themed non-cacheable failure for storage errors and capacity limits', async () => {
    evalMock.mockResolvedValueOnce(0).mockResolvedValueOnce(-1);
    const response = await app.request('/profile/nayandas69?theme=dracula');
    expect(response.status).toBe(503);
    const body = await response.text();
    expect(body).toContain('unavailable');
    expect(body).toContain('#282a36');
    expect(response.headers.get('retry-after')).toBe('30');
    expect(response.headers.get('cache-control')).toContain('no-store');
  });

  it('returns an unavailable badge when storage fails', async () => {
    evalMock.mockRejectedValueOnce(new Error('sensitive provider details'));
    const response = await app.request('/profile/nayandas69');
    expect(response.status).toBe(503);
    const body = await response.text();
    expect(body).toContain('unavailable');
    expect(body).not.toContain('sensitive');
    expect(evalMock).toHaveBeenCalledTimes(1);
  });

  it('increments the same counter across themes', async () => {
    let count = 0;
    evalMock.mockImplementation(async (_script, keys) =>
      keys[0] === 'profile-views:v2' ? ++count : 0
    );
    const first = await app.request('/profile/Example?theme=dracula');
    const second = await app.request('/profile/example?theme=nord');
    expect(await first.text()).toContain('Profile views: 1');
    expect(await second.text()).toContain('Profile views: 2');
    expect(evalMock).toHaveBeenCalledWith(
      expect.any(String),
      ['profile-views:v2'],
      ['example', 100000]
    );
  });

  it('chooses complete credential pairs and prefers Upstash', async () => {
    process.env['UPSTASH_REDIS_REST_URL'] = 'https://partial.example.test';
    delete process.env['UPSTASH_REDIS_REST_TOKEN'];
    process.env['KV_REST_API_URL'] = 'https://kv.example.test';
    process.env['KV_REST_API_TOKEN'] = 'kv-synthetic';
    evalMock.mockResolvedValue(1);
    expect(await incrementProfileViews('test')).toBe(1);
    expect(RedisMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ url: 'https://kv.example.test', token: 'kv-synthetic' })
    );
    process.env['UPSTASH_REDIS_REST_TOKEN'] = 'upstash-synthetic';
    expect(await incrementProfileViews('test')).toBe(1);
    expect(RedisMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ url: 'https://partial.example.test', token: 'upstash-synthetic' })
    );
    delete process.env['KV_REST_API_URL'];
    delete process.env['UPSTASH_REDIS_REST_TOKEN'];
    await expect(incrementProfileViews('test')).rejects.toThrow('not configured');
  });

  it.each([-1, Number.MAX_SAFE_INTEGER + 1, NaN])('rejects invalid counter %s', async (count) => {
    evalMock.mockResolvedValue(count);
    await expect(incrementProfileViews('test')).rejects.toThrow('unavailable');
  });

  it('renders GitHub icon and accessible count for every supported theme', async () => {
    expect(Object.keys(themes)).toHaveLength(56);
    evalMock.mockResolvedValue(26703);
    for (const [name, palette] of Object.entries(themes)) {
      const response = await app.request(`/profile/test?theme=${name}`);
      const svg = await response.text();
      expect(response.status).toBe(200);
      expect(svg).toContain('Profile views: 26,703');
      expect(svg).toContain(`fill="#${palette.bg}"`);
      expect(svg).toContain(`fill="#${palette.title}"`);
      expect(svg).toContain('aria-hidden="true"');
      expect(svg).toContain('M8 0C3.58');
    }
    expect(renderProfileViews(1, '__proto__')).toBe(renderProfileViews(1, 'default'));
    expect(renderProfileViews(1, '<script>')).not.toContain('<script>');
    expect(renderProfileViews(Number.MAX_SAFE_INTEGER)).toContain('9,007,199,254,740,991');
    expect(renderProfileViews(1)).toContain('#555555');
    expect(renderProfileViews(1)).toContain('#007fb5');
  });
});
