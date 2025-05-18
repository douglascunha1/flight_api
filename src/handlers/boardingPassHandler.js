import * as service from '../services/boardingPassService.js';
import redis from '../config/db/redis.js';

export async function getBoardingPass(c) {
    const data = await service.findAll();

    return c.json(data, 200);
}

export async function getBoardingPassById(c) {
  try {
    const id = c.req.param('id');

    const data = await service.findById(id);

    return c.json(data, 200);
  } catch (err) {
    return c.json({ error: err.message }, 404);
  }
}

export async function getBoardingPassDetails(c) {
  try {    
    const data = await service.getDetailedBoardingPasses();

    return c.json(data, 200);
  } catch (err) {
    return c.json({ error: err.message }, 404);
  }
}

export async function createBoardingPass(c) {
  try {
    const payload = await c.req.json();

    const result = await service.create(payload);

    await redis.del('boardingPasses:/boarding-passes');
    await redis.del('boardingPassesDetails:/boarding-passes/details');

    return c.json({ message: 'Boarding pass created successfully', data: result[0] }, 201);

  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function updateBoardingPass(c) {
  try {
    const id = c.req.param('id');

    const payload = await c.req.json();

    const result = await service.update(id, payload);

    await redis.del('boardingPasses:/boarding-passes');
    await redis.del('boardingPassesDetails:/boarding-passes/details');
    await redis.del(`boardingPasses:/boarding-passes/${id}`);

    return c.json({ message: 'Boarding pass updated successfully', data: result[0] }, 200);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}

export async function deleteBoardingPass(c) {
  try {
    const id = c.req.param('id');

    const result = await service.remove(id);

    await redis.del('boardingPasses:/boarding-passes');
    await redis.del('boardingPassesDetails:/boarding-passes/details');
    await redis.del(`boardingPasses:/boarding-passes/${id}`);

    return c.json({ message: 'Boarding pass deleted successfully' }, 204);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
}