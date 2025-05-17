import * as service from '../services/boardingPassService.js';

export async function getBoardingPass(c) {
    const data = await service.findAll();

    return c.json(data);
}

export async function getBoardingPassById(c) {
  try {
    const id = c.req.param('id');

    const data = await service.findById(id);

    return c.json(data);
  } catch (err) {
    return c.json({ error: err.message }, 404);
  }
}

export async function createBoardingPass(c) {
  try {
    const payload = await c.req.json();

    const result = await service.create(payload);

    return c.json(result);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updateBoardingPass(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);

    return c.json(result);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deleteBoardingPass(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function getBoardingPassDetails(c) {
  try {    
    const data = await service.getDetailedBoardingPasses();

    return c.json(data);
  } catch (err) {
    return c.json({ error: 'Failed to fetch boarding pass details' }, 500);
  }
}