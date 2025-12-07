import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load .env file if it exists (for local development)
// In Docker, DATABASE_URL comes from environment variables
config({ path: "../../.env" })

export default defineConfig({
  out: './drizzle',
  // Schema definitions live in the db package
  schema: './src/tables/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

