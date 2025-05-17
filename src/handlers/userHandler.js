import * as service from '../services/userService.js';

export async function createUser(c) {
  try {
    const payload = await c.req.json();

    const result = await service.create(payload);

    return c.json(result);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updateUser(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);

    return c.json(result);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deleteUser(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}