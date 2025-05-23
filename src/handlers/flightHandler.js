import * as service from '../services/flightService.js';
import redis from '../config/db/redis.js';

export async function getFlight(c) {
    const data = await service.findAll();

    return c.json(data);
}

export async function getFlightById(c) {
  try {
    const id = c.req.param('id');

    const data = await service.findById(id);

    return c.json(data);
  } catch (err) {
    return c.json({ error: err.message }, 404);
  }
}

export async function createFlight(c) {
  try {
    const payload = await c.req.json();

    const result = await service.create(payload);
    
    await redis.del('flights:/flights');

    return c.json({ message: 'Flight created successfully', data: result[0] }, 201);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updateFlight(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);
    
    await redis.del('flights:/flights');
    await redis.del(`flight:/flights/${id}`);

    return c.json({ message: 'Flight updated successfully', data: result[0] }, 200);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deleteFlight(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    await redis.del('flights:/flights');
    await redis.del(`flight:/flights/${id}`);

    return c.json({ success: true, message: 'Flight deleted successfully' });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}