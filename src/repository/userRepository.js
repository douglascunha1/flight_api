import { database as db, eq } from '../config/db/index.js';
import { sys_user } from '../config/db/schema.js';

export const create = (data) => {
    return db.insert(sys_user).values(data);
};

export const update = (id, data) => {
    return db.update(sys_user).set(data).where(eq(sys_user.id, Number(id)));
};

export const remove = (id) => {
    return db.delete(sys_user).where(eq(sys_user.id, Number(id)));
};
