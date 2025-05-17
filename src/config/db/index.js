import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { sql, eq } from "drizzle-orm";


const connectToDatabase = async () => {
  try {
    const pool = await mysql.createPool(process.env.DATABASE_URL);

    return drizzle(pool);
  } catch (err) {
    throw new Error('❌ Não foi possível conectar ao banco de dados.');
  }
};

const database = await connectToDatabase();

export { database, sql, eq };
