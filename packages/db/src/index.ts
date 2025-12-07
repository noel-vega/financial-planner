import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import { Pool } from "pg";
import * as schema from "./tables/index.js";

config({ path: "../../.env" });

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
export const db = drizzle({ client: pool, schema });

// Export all table definitions and types
export * from "./tables/index.js";
export * from "./types/index.js";
