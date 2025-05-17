import { database as db, eq } from '../config/db/index.js';
import { passenger } from '../config/db/schema.js';

export const findAll = () => {
    return db.select().from(passenger);
};

export const findById = (id) => {
    return db.select().from(passenger).where(eq(passenger.passenger_id, Number(id)));
};

export const create = (data) => {
    return db.insert(passenger).values(data);
};

export const update = (id, data) => {
    return db.update(passenger).set(data).where(eq(passenger.passenger_id, Number(id)));
};

export const remove = (id) => {
    return db.delete(passenger).where(eq(passenger.passenger_id, Number(id)));
};
