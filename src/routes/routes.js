import { getPassengers, getPassengerById } from "../handlers/passengerHandler.js"
import { getFlight, getFlightById } from "../handlers/flightHandler.js"
import { getAircraft, getAircraftById } from "../handlers/aircraftHandler.js"
import { getBoardingPass, getBoardingPassById } from "../handlers/boardingPassHandler.js"
import { getUser, getUserById } from "../handlers/userHandler.js"

export const routes = (app) => {
    app.get('/passengers', getPassengers);
    app.get('/passengers/:id', getPassengerById);

    app.get('/flights', getFlight);
    app.get('/flights/:id', getFlightById);

    app.get('/aircrafts', getAircraft);
    app.get('/aircrafts/:id', getAircraftById);

    app.get('/boarding-passes', getBoardingPass);
    app.get('/boarding-passes/:id', getBoardingPassById);

    app.get('/users', getUser);
    app.get('/users/:id', getUserById);
}
