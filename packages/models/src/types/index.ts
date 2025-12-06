import type { UpdateExpenseSchema, InsertExpenseSchema, IdSchema } from "../schemas/index.js"
import { z } from "zod"
import type { expensesTable, usersTable } from "../tables/index.js"

export type Id = z.infer<typeof IdSchema>

export type User = typeof usersTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert

export type Expense = typeof expensesTable.$inferSelect

export type InsertExpense = z.infer<typeof InsertExpenseSchema>
export type UpdateExpense = z.infer<typeof UpdateExpenseSchema>


