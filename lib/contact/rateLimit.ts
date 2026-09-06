type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
// In-memory limiter for a single Node.js process.

const hits = new Map<string, RateLimitEntry>();

function prune(now: number) {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) {
      hits.delete(key);
    }
  }
}

export function checkContactRateLimit(ip: string) {
  const now = Date.now();
  prune(now);

  const current = hits.get(ip);
  if (!current || current.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true as const };
  }

  if (current.count >= MAX_REQUESTS) {
    return { ok: false as const };
  }

  current.count += 1;
  return { ok: true as const };
}

export function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
