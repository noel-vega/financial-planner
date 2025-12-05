import { date, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  biWeeklyIncome: integer().notNull().default(0),
});

export const expensesTable = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  category: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull()
});
