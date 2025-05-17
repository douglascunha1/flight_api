import * as service from '../services/userService.js';
import { redis } from '../config/db/redis.js';

export const getAllUsers = async (c) => {
  const users = await service.getUsers();

  return c.json(users);
};

export const getUserById = async (c) => {
  const id = Number(c.req.param('id'));

  const profile = await service.getUserById(id);

  return c.json(profile);
};

export const createUser = async (c) => {
  const data = await c.req.json();

  try {
    await service.create(data);
  }
  catch (error) {
    return c.json({ error:  error.message }, 409);
  }

  await redis.del('users:/users');

  return c.json({ message: 'Usuário criado' });
};

export const updateUser = async (c) => {
  const user = c.get('user');
  const targetUserId = Number(c.req.param('id'));
  const data = await c.req.json();

  if (user.type !== 'admin' && user.id !== targetUserId) {
    return c.json({ error: 'Acesso negado: você só pode alterar seus próprios dados.' }, 403);
  }

  if (user.type !== 'admin' && user.type !== data.type) {
    return c.json({ error: 'Acesso negado: você não pode alterar o tipo de usuário.' }, 403);
  }

  try {
    const updatedUser = await service.update(targetUserId, data);

    await redis.del('users:/users');
    await redis.del(`user:/users/${targetUserId}`);

    return c.json({ message: 'Usuário atualizado', data });
  } 
  catch (error) {
    return c.json({ error: error.message }, 409);
  }
};

export const deleteUser = async (c) => {
  const id = Number(c.req.param('id'));

  const deletedUser = await service.remove(id);

  if (!deletedUser) {
    return c.json({ error: 'Usuário não encontrado' }, 404);
  }

  await redis.del('users:/users');
  await redis.del(`user:/users/${id}`);
  
  return c.json({ message: 'Usuário deletado' });
};