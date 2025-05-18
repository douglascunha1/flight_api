import { database as db, eq } from '../config/db/index.js';
import { sys_user } from '../config/db/schema.js';

export const getUserByEmail = async (email) => {
  const result = await db
    .select()
    .from(sys_user)
    .where(eq(sys_user.login_email, email));

  return result[0];
};

export const getUserById = async (id) => {
  const result = await db.select().from(sys_user).where(eq(sys_user.id, Number(id)));

  return result[0];
};

export const getAllUsers = () => db.select().from(sys_user);

export const create = (data) => {
    return db.insert(sys_user).values(data).returning();
};

export const update = (id, data) => {
    return db.update(sys_user).set(data).where(eq(sys_user.id, Number(id))).returning();
};

export const remove = async (id) => {
    return await db.delete(sys_user).where(eq(sys_user.id, Number(id)));
};
