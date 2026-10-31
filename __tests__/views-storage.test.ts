import { expect, it, vi } from 'vitest';
import { incrementProfileViews } from '../src/services/views.js';

it('sends atomic scripts through the real Redis SDK without an expiry or retries', async () => {
  process.env['UPSTASH_REDIS_REST_URL'] = 'https://redis.example.test';
  process.env['UPSTASH_REDIS_REST_TOKEN'] = 'synthetic-test-token';
  const commands: unknown[][] = [];
  global.fetch = vi.fn(async (_url, options) => {
    const body = JSON.parse(String(options?.body)) as unknown[];
    const pipelined = Array.isArray(body[0]);
    const command = (pipelined ? body[0] : body) as unknown[];
    commands.push(command);
    return new Response(
      JSON.stringify(
        pipelined
          ? [{ result: commands.length === 1 ? 0 : 26703 }]
          : { result: commands.length === 1 ? 0 : 26703 }
      ),
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
  expect(await incrementProfileViews('NayanDas69')).toBe(26703);
  expect(commands).toHaveLength(2);
  expect(commands[0]?.[0]).toBe('eval');
  expect(commands[0]?.slice(2)).toEqual([1, 'profile-views:v1:nayandas69']);
  expect(commands[1]?.slice(2)).toEqual([1, 'profile-views:v2', 'nayandas69', 100000]);
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

it('does not retry an ambiguous transport failure through the Redis SDK', async () => {
  process.env['UPSTASH_REDIS_REST_URL'] = 'https://redis.example.test';
  process.env['UPSTASH_REDIS_REST_TOKEN'] = 'synthetic-test-token';
  global.fetch = vi.fn().mockRejectedValue(new Error('Connection lost after write'));
  await expect(incrementProfileViews('test')).rejects.toThrow();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
