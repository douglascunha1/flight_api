import { database as db, eq } from '../config/db/index.js';
import { boarding_pass, passenger, flight, aircraft } from '../config/db/schema.js';

export const findAll = () => {
    return db.select().from(boarding_pass);
};

export const findById = (id) => {
    return db.select().from(boarding_pass).where(eq(boarding_pass.boarding_pass_id, Number(id)));
};

export const findDetailedBoardingPasses = () => {
  return db
    .select({
      boarding_pass_id: boarding_pass.boarding_pass_id,
      seat_number: boarding_pass.seat_number,
      issue_time: boarding_pass.issue_time,
      passenger_first_name: passenger.first_name,
      passenger_last_name: passenger.last_name,
      passenger_birth_date: passenger.birth_date,
      passenger_passport_number: passenger.passport_number,
      flight_number: flight.flight_number,
      departure_airport: flight.departure_airport,
      arrival_airport: flight.arrival_airport,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      aircraft_model: aircraft.model,
      aircraft_manufacturer: aircraft.manufacturer,
      aircraft_capacity: aircraft.capacity,
    })
    .from(boarding_pass)
    .innerJoin(passenger, eq(boarding_pass.passenger_id, passenger.passenger_id))
    .innerJoin(flight, eq(boarding_pass.flight_id, flight.flight_id))
    .innerJoin(aircraft, eq(flight.aircraft_id, aircraft.aircraft_id))
    .orderBy(boarding_pass.boarding_pass_id);
}

export const create = (data) => {
    return db.insert(boarding_pass).values(data);
};

export const update = (id, data) => {
    return db.update(boarding_pass).set(data).where(eq(boarding_pass.boarding_pass_id, Number(id)));
};

export const remove = (id) => {
    return db.delete(boarding_pass).where(eq(boarding_pass.boarding_pass_id, Number(id)));
};