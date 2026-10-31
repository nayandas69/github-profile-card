import { Redis } from '@upstash/redis';
import { icons } from '../utils/icons.js';
import { themes } from '../utils/themes.js';
import { getRedisCredentials } from './redis-credentials.js';

// Legacy per-user keys are incremented only if they already exist. This preserves
// earlier counts without creating additional unbounded keys.
export const INCREMENT_EXISTING_VIEW = `
if redis.call('EXISTS', KEYS[1]) == 1 then
  return redis.call('INCR', KEYS[1])
end
return 0
`;

// A single hash and atomic script keep admission and increment on one Redis shard.
export const INCREMENT_BOUNDED_VIEW = `
if redis.call('HEXISTS', KEYS[1], ARGV[1]) == 0 and redis.call('HLEN', KEYS[1]) >= tonumber(ARGV[2]) then
  return -1
end
return redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
`;

export const MAX_PROFILE_VIEW_COUNTERS = 100_000;

/** Persistent counters are separate from the expiring card cache. */
export async function incrementProfileViews(username: string): Promise<number> {
  const credentials = getRedisCredentials();
  if (!credentials) throw new Error('Profile view storage is not configured');

  const redis = new Redis({
    ...credentials,
    // Retrying a write after a lost response could count the same request twice.
    retry: { retries: 0 },
    signal: () => AbortSignal.timeout(5000),
  });
  const login = username.toLowerCase();
  const existing = await redis.eval<unknown[], number>(
    INCREMENT_EXISTING_VIEW,
    [`profile-views:v1:${login}`],
    []
  );
  const count =
    existing === 0
      ? await redis.eval<unknown[], number>(
          INCREMENT_BOUNDED_VIEW,
          ['profile-views:v2'],
          [login, MAX_PROFILE_VIEW_COUNTERS]
        )
      : existing;
  if (!Number.isSafeInteger(count) || count < 1) throw new Error('Profile view count unavailable');
  return count;
}

/** Choose a readable foreground while retaining the selected palette when possible. */
function contrastRatio(a: string, b: string): number {
  const luminance = (hex: string) => {
    const full = hex.length === 3 ? [...hex].map((v) => v + v).join('') : hex;
    const channels = [0, 2, 4]
      .map((offset) => parseInt(full.slice(offset, offset + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
  };
  const l1 = luminance(a),
    l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function readableColor(preferred: string, background: string): string {
  if (contrastRatio(preferred, background) >= 4.5) return preferred;
  return contrastRatio('ffffff', background) >= contrastRatio('000000', background)
    ? 'ffffff'
    : '000000';
}

/** Static SVG only: no scripts, external assets, or user-controlled markup. */
export function renderProfileViews(count: number | null, theme?: string): string {
  const palette =
    theme === undefined ? null : themes[Object.hasOwn(themes, theme) ? theme : 'default']!;
  const left = palette?.bg ?? '555555';
  const right = palette?.title ?? '007fb5';
  const label = palette ? readableColor(palette.text, left) : 'ffffff';
  const glyph = palette ? readableColor(palette.icon, left) : 'ffffff';
  const number = palette ? readableColor(palette.text, right) : 'ffffff';
  const value = count === null ? 'unavailable' : count.toLocaleString('en-US');
  const valueWidth = Math.max(94, value.length * 14 + 28);
  const labelWidth = 206;
  const width = labelWidth + valueWidth;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="44" viewBox="0 0 ${width} 44" role="img" aria-label="Profile views: ${value}">
  <title>Profile views: ${value}</title>
  <defs><clipPath id="rounded"><rect width="${width}" height="44" rx="6"/></clipPath></defs>
  <g clip-path="url(#rounded)">
    <path fill="#${left}" d="M0 0h${labelWidth}v44H0z"/>
    <path fill="#${right}" d="M${labelWidth} 0h${valueWidth}v44H${labelWidth}z"/>
  </g>
  <svg x="10" y="10" width="24" height="24" viewBox="0 0 16 16" fill="#${glyph}" aria-hidden="true">${icons.github}</svg>
  <g text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="24">
    <text fill="#${label}" x="119" y="30">Profile views</text><text fill="#${number}" x="${labelWidth + valueWidth / 2}" y="30">${value}</text>
  </g>
</svg>`;
}
