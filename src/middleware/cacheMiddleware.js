import redis from '../config/db/redis.js';

export const cacheMiddleware = (keyPrefix) => async (c, next) => {
  if (c.req.method !== 'GET') {
    return await next();
  }

  const url = new URL(c.req.url);
  const key = `${keyPrefix}:${url.pathname}${url.search}`;

  const cached = await redis.get(key);

  if (cached) {
    return c.json(JSON.parse(cached));
  }

  const originalJson = c.json.bind(c);

  c.json = async (data, status = 200, headers) => {
    if (status >= 200 && status < 300) {
      await redis.set(key, JSON.stringify(data), { EX: 60 });
    }
    return originalJson(data, status, headers);
  };

  await next();
};
