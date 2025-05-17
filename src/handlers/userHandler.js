import * as service from '../services/userService.js';

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

  return c.json({ message: 'Usuário criado' });
};

export const updateUser = async (c) => {
  const id = Number(c.req.param('id'));

  const data = await c.req.json();

  const currentUser = c.get('user');

  try {
    await service.update(id, data, currentUser);

    return c.json({ message: 'Atualizado com sucesso' });
  } catch {
    return c.json({ error: 'Acesso negado' }, 403);
  }
};

export const deleteUser = async (c) => {
  const id = Number(c.req.param('id'));

  const deletedUser = await service.remove(id);

  if (!deletedUser) {
    return c.json({ error: 'Usuário não encontrado' }, 404);
  }
  
  return c.json({ message: 'Usuário deletado' });
};