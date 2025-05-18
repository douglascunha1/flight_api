import * as service from '../services/userService.js';
import { generateToken } from '../utils/jwt.js';

export const loginHandler = async (c) => {
  const { email, password } = await c.req.json();

  const user = await service.login(email, password);

  if (!user) return c.json({ error: 'Credentials are invalid' }, 401);

  const token = await generateToken(user);

  return c.json({ token });
};
