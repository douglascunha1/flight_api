import * as service from '../services/passengerService.js';
import redis from '../config/db/redis.js';

export async function getPassengers(c) {
    const data = await service.findAll();

    return c.json(data);
}

export async function getPassengerById(c) {
  try {
    const id = c.req.param('id');

    const data = await service.findById(id);

    return c.json(data);
  } catch (err) {
    return c.json({ error: err.message }, 404);
  }
}

export async function createPassenger(c) {
  try {
    const payload = await c.req.json();

    const result = await service.create(payload);

    await redis.del('passengers:/passengers');

    return c.json(result);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updatePassenger(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);
    
    await redis.del('passengers:/passengers');
    await redis.del(`passenger:/passengers/${id}`);

    return c.json(result);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deletePassenger(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    await redis.del('passengers:/passengers');
    await redis.del(`passenger:/passengers/${id}`);

    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}