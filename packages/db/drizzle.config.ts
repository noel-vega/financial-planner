import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: "../../.env" })

export default defineConfig({
  out: './drizzle',
  // Schema definitions live in the models package to enable
  // type-safe sharing with frontend without bundling DB runtime
  schema: '../models/src/tables/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

