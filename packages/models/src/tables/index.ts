import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

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

export const goalsTable = pgTable("goals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  targetAmount: integer().notNull(),
  monthlyCommitment: integer().notNull().default(0),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull()
})

export const goalsRelations = relations(goalsTable, ({ many }) => ({
  contributions: many(goalContributionsTable)
}))

export const goalContributionsTable = pgTable("goal_contributions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  goalId: integer().notNull().references(() => goalsTable.id, { onDelete: "cascade" }),
  amount: integer().notNull(),
  note: varchar({ length: 255 }),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
})

export const goalContributionsRelations = relations(goalContributionsTable, ({ one }) => ({
  goal: one(goalsTable, {
    fields: [goalContributionsTable.goalId],
    references: [goalsTable.id]
  })
}))
