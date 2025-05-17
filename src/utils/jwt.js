import { sign, verify } from 'hono/jwt';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('Secret key for JWT is not defined');
}

export const generateToken = (user) => {
  return sign(
    {
      id: user.id,
      type: user.user_type,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    secret
  );
};

export const verifyToken = (token) => {
  return verify(token, secret);
};
