import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from 'dotenv';
import { Pool } from 'pg';
import * as schema from "@financial-planner/models"

config({ path: "../../.env" })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
export const db = drizzle({ client: pool, schema });

export * from "@financial-planner/models"
