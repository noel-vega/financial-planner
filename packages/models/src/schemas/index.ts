import { expensesTable } from "../tables/index.js"
import z from "zod"

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
}) satisfies z.ZodType<Omit<typeof expensesTable.$inferInsert, 'createdAt'>>

export const IdSchema = z.object({ id: z.number() })
