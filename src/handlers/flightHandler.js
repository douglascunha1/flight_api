import * as service from '../services/flightService.js';

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

    return c.json(result);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updateFlight(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);

    return c.json(result);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deleteFlight(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}