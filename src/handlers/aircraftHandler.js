import * as service from '../services/aircraftService.js';
import redis from '../config/db/redis.js';

export async function getAircraft(c) {
    const data = await service.findAll();

    return c.json(data, 200);
}

export async function getAircraftById(c) {
  try {
    const id = c.req.param('id');

    const data = await service.findById(id);

    return c.json(data, 200);
  } catch (err) {
    return c.json({ error: err.message }, 404);
  }
}

export async function createAircraft(c) {
  try {
    const payload = await c.req.json();

    const result = await service.create(payload);

    await redis.del('aircrafts:/aircrafts');

    return c.json({ message: 'Aircraft created successfully', data: result[0] }, 201);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updateAircraft(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);

    await redis.del('aircrafts:/aircrafts');
    await redis.del(`aircraft:/aircrafts/${id}`);

    return c.json({ message: 'Aircraft updated successfully', data: result[0] }, 200);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deleteAircraft(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    await redis.del('aircrafts:/aircrafts');
    await redis.del(`aircraft:/aircrafts/${id}`);

    return c.json({ message: 'Aircraft deleted successfully' }, 204);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}