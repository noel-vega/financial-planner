import type { expensesTable, goalContributionsTable, goalsTable, usersTable } from "../tables/index.js"

// Users
export type User = typeof usersTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert

// Expenses
export type Expense = typeof expensesTable.$inferSelect
export type InsertExpense = typeof expensesTable.$inferInsert

// Goals
export type Goal = typeof goalsTable.$inferSelect
export type InsertGoal = typeof goalsTable.$inferInsert

// Goal Contributions
export type GoalContribution = typeof goalContributionsTable.$inferSelect
export type InsertGoalContribution = typeof goalContributionsTable.$inferInsert
