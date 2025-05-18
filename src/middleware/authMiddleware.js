import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = async (c, next) => {
  const header = c.req.header('Authorization');
  
  if (!header) return c.json({ error: 'Authorization header is missing' }, 401);

  try {
    const token = header.replace('Bearer ', '');

    const user = await verifyToken(token);
    
    c.set('user', user);
    
    await next();
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
};
