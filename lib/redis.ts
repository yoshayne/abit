import Redis from "ioredis";

// Railway provides REDIS_URL automatically when you add the Redis plugin.
// We connect lazily so the app still builds/deploys even if Redis isn't set.

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }
  return redis;
}
