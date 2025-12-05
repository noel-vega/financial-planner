import type { UpSertExpenseSchema } from "../schemas/index.js"
import { z } from "zod"
import type { expensesTable, usersTable } from "../tables/index.js"

export type User = typeof usersTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert

export type Expense = typeof expensesTable.$inferSelect

export type UpSertExpense = z.infer<typeof UpSertExpenseSchema>
