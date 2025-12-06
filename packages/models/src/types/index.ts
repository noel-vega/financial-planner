import type { UpdateExpenseSchema, InsertExpenseSchema, IdSchema, InsertGoalSchema, UpdateGoalSchema, InsertGoalContributionSchema, UpdateGoalContributionSchema } from "../schemas/index.js"
import { z } from "zod"
import type { expensesTable, goalContributionsTable, goalsTable, usersTable } from "../tables/index.js"

export type Id = z.infer<typeof IdSchema>

// Users
export type User = typeof usersTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert

// Expenses
export type Expense = typeof expensesTable.$inferSelect
export type InsertExpense = z.infer<typeof InsertExpenseSchema>
export type UpdateExpense = z.infer<typeof UpdateExpenseSchema>

// Goals
export type Goal = typeof goalsTable.$inferSelect
export type InsertGoal = z.infer<typeof InsertGoalSchema>
export type UpdateGoal = z.infer<typeof UpdateGoalSchema>
export type GoalContribution = typeof goalContributionsTable.$inferSelect
export type InsertGoalContribution = z.infer<typeof InsertGoalContributionSchema>
export type UpdateGoalContribution = z.infer<typeof UpdateGoalContributionSchema>

