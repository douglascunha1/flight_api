import { database as db, eq } from '../config/db/index.js';
import { aircraft } from '../config/db/schema.js';

export const findAll = () => {
    return db.select().from(aircraft);
};

export const findById = (id) => {
    return db.select().from(aircraft).where(eq(aircraft.aircraft_id, Number(id)));
};

export const create = (data) => {
    return db.insert(aircraft).values(data);
};

export const update = (id, data) => {
    return db.update(aircraft).set(data).where(eq(aircraft.aircraft_id, Number(id)));
};

export const remove = (id) => {
    return db.delete(aircraft).where(eq(aircraft.aircraft_id, Number(id)));
};
