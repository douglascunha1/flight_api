import redis from '../config/db/redis.js';

export const cacheMiddleware = (keyPrefix) => async (c, next) => {
  const key = `${keyPrefix}:${c.req.path}`;

  const cached = await redis.get(key);

  if (cached) {
    return c.json(JSON.parse(cached));
  }

  const originalJson = c.json.bind(c);
  
  c.json = async (data, status = 200, headers) => {
    await redis.set(key, JSON.stringify(data), { EX: 60 });
    return originalJson(data, status, headers);
  };

  await next();
};
