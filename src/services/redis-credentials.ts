/** Choose credentials from one provider; never mix URLs and tokens. */
export function getRedisCredentials(): { url: string; token: string } | null {
  const url = process.env['UPSTASH_REDIS_REST_URL'];
  const token = process.env['UPSTASH_REDIS_REST_TOKEN'];
  if (url && token) return { url, token };
  const kvUrl = process.env['KV_REST_API_URL'];
  const kvToken = process.env['KV_REST_API_TOKEN'];
  return kvUrl && kvToken ? { url: kvUrl, token: kvToken } : null;
}
