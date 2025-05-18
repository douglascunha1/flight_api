import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql, eq } from 'drizzle-orm';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });


export { db as database, sql, eq };
