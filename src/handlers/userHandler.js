import * as service from '../services/userService.js';
import redis from '../config/db/redis.js';

export const getAllUsers = async (c) => {
  const users = await service.getUsers();

  return c.json(users, 200);
};

export const getUserById = async (c) => {
  const id = Number(c.req.param('id'));

  const profile = await service.getUserById(id);

  if (!profile) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json(profile, 200);
};

export const createUser = async (c) => {
  const data = await c.req.json();
  
  let result;

  try {
    result = await service.create(data);
  }
  catch (error) {
    return c.json({ error:  error.message }, 409);
  }

  await redis.del('users:/users');

  return c.json({ message: 'User created successfully', data: result[0] }, 201);
};

export const updateUser = async (c) => {
  const user = c.get('user');
  const targetUserId = Number(c.req.param('id'));
  const data = await c.req.json();

  if (user.type !== 'admin' && user.id !== targetUserId) {
    return c.json({ error: 'Access denied: you can only change your own data.' }, 403);
  }

  if (user.type !== 'admin' && user.type !== data.type) {
    return c.json({ error: 'Access denied: you cannot change the user type.' }, 403);
  }

  try {
    const updatedUser = await service.update(targetUserId, data);

    await redis.del('users:/users');
    await redis.del(`user:/users/${targetUserId}`);

    return c.json({ message: 'User updated successfully', data: updatedUser[0] }, 200);
  } catch (error) {
    return c.json({ error: error.message }, 409);
  }
};

export const deleteUser = async (c) => {
  const id = Number(c.req.param('id'));

  const deletedUser = await service.remove(id);

  if (!deletedUser) {
    return c.json({ error: 'User not found' }, 404);
  }

  await redis.del('users:/users');
  await redis.del(`user:/users/${id}`);

  return c.json({ message: 'User deleted successfully' }, 200);
};