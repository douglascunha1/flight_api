import { database as db, eq } from '../config/db/index.js';
import { flight } from '../config/db/schema.js';

export const findAll = () => {
    return db.select().from(flight);
};

export const findById = (id) => {
    return db.select().from(flight).where(eq(flight.flight_id, Number(id)));
};

export const create = (data) => {
    return db.insert(flight).values(data);
};

export const update = (id, data) => {
    return db.update(flight).set(data).where(eq(flight.flight_id, Number(id)));
};

export const remove = (id) => {
    return db.delete(flight).where(eq(flight.flight_id, Number(id)));
};
