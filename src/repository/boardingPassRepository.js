import { database as db, eq } from '../config/db/index.js';
import { boarding_pass } from '../config/db/schema.js';

export const findAll = () => {
    return db.select().from(boarding_pass);
};

export const findById = (id) => {
    return db.select().from(boarding_pass).where(eq(boarding_pass.boarding_pass_id, Number(id)));
};

export const create = (data) => {
    return db.insert(boarding_pass).values(data);
};

export const update = (id, data) => {
    return db.update(boarding_pass).set(data).where(eq(boarding_pass.boarding_pass_id, Number(id)));
};

export const remove = (id) => {
    return db.delete(boarding_pass).where(eq(boarding_pass.boarding_pass_id, Number(id)));
};
