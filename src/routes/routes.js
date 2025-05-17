import {
  getPassengers,
  getPassengerById,
  createPassenger,
  updatePassenger,
  deletePassenger
} from "../handlers/passengerHandler.js";

import {
  getFlight,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight
} from "../handlers/flightHandler.js";

import {
  getAircraft,
  getAircraftById,
  createAircraft,
  updateAircraft,
  deleteAircraft
} from "../handlers/aircraftHandler.js";

import {
  getBoardingPass,
  getBoardingPassById,
  createBoardingPass,
  updateBoardingPass,
  deleteBoardingPass,
  getBoardingPassDetails
} from "../handlers/boardingPassHandler.js";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../handlers/userHandler.js";

import { loginHandler } from "../handlers/authHandler.js";
import { onlyAdmin } from "../middleware/roleMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { rateLimiter } from "hono-rate-limiter";

export const routes = (app) => {
  app.post('/login', loginHandler);

  app.use(
    '*',
    rateLimiter({
      windowMs: 60 * 60 * 1000,
      limit: 100,
      standardHeaders: "draft-6",
      keyGenerator: (c) => {
        return c.req.raw?.socket?.remoteAddress || 'unknown';
      },
    })
  );

  app.get('/passengers', cacheMiddleware('passengers'), getPassengers);
  app.get('/passengers/:id', cacheMiddleware('passenger'), getPassengerById);
  app.post('/passengers', createPassenger);
  app.put('/passengers/:id', updatePassenger);
  app.delete('/passengers/:id', deletePassenger);

  app.get('/flights', cacheMiddleware('flights'), getFlight);
  app.get('/flights/:id', cacheMiddleware('flight'), getFlightById);
  app.post('/flights', createFlight);
  app.put('/flights/:id', updateFlight);
  app.delete('/flights/:id', deleteFlight);

  app.get('/aircrafts', cacheMiddleware('aircrafts'), getAircraft);
  app.get('/aircrafts/:id', cacheMiddleware('aircraft'), getAircraftById);
  app.post('/aircrafts', createAircraft);
  app.put('/aircrafts/:id', updateAircraft);
  app.delete('/aircrafts/:id', deleteAircraft);

  app.get('/boarding-passes', cacheMiddleware('boardingPasses'), getBoardingPass);
  app.get('/boarding-passes/details', cacheMiddleware('boardingPassesDetails'), getBoardingPassDetails);
  app.get('/boarding-passes/:id', cacheMiddleware('boardingPass'), getBoardingPassById);
  app.post('/boarding-passes', createBoardingPass);
  app.put('/boarding-passes/:id', updateBoardingPass);
  app.delete('/boarding-passes/:id', deleteBoardingPass);

  app.get('/users', authMiddleware, cacheMiddleware('users'), getAllUsers);
  app.get('/users/:id', authMiddleware, cacheMiddleware('user'), getUserById);
  app.post('/users', authMiddleware, onlyAdmin, createUser);
  app.put('/users/:id', authMiddleware, updateUser);
  app.delete('/users/:id', authMiddleware, onlyAdmin, deleteUser);
};
