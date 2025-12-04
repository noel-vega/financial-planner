import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  biWeeklyIncome: integer().notNull().default(0),
});

export type User = typeof usersTable.$inferInsert 
