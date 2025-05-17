import { sign, verify } from 'hono/jwt';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('Secret key for JWT is not defined');
}

export const generateToken = (user) => sign({ id: user.id, type: user.user_type }, secret);
export const verifyToken = (token) => verify(token, secret);
