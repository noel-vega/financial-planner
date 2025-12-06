import { expensesTable, goalContributionsTable, goalsTable } from "../tables/index.js"
import z from "zod"

export const IdSchema = z.object({ id: z.number() })

// Expenses
export const InsertExpenseSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  category: z.string().min(1).max(255),
  amount: z.number().min(1)
}) satisfies z.ZodType<Omit<typeof expensesTable.$inferInsert, 'id' | 'createdAt'>>

export const UpdateExpenseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").max(255),
  category: z.string().min(1).max(255),
  amount: z.number().min(1)
}) satisfies z.ZodType<Omit<typeof expensesTable.$inferSelect, 'createdAt'>>

// Goals
export const InsertGoalSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  targetAmount: z.number().min(1),
  monthlyCommitment: z.number().positive(),
}) satisfies z.ZodType<Omit<typeof goalsTable.$inferInsert, 'id' | 'createdAt'>>

export const UpdateGoalSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").max(255),
  targetAmount: z.number().min(1),
  monthlyCommitment: z.number().min(0),
}) satisfies z.ZodType<Omit<typeof goalsTable.$inferSelect, 'createdAt'>>

export const InsertGoalContributionSchema = z.object({
  goalId: z.number(),
  name: z.string().min(1, "Name is required").max(255),
  amount: z.number().min(1),
  note: z.string().max(255).nullable()
}) satisfies z.ZodType<Omit<typeof goalContributionsTable.$inferInsert, 'id' | 'createdAt'>>

export const UpdateGoalContributionSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").max(255),
  amount: z.number().min(1),
  note: z.string().max(255).nullable(),
}) satisfies z.ZodType<Omit<typeof goalContributionsTable.$inferSelect, 'goalId' | 'createdAt'>>
