import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { appRouter } from "./trpc/_app.js"

export type { AppRouter } from "./trpc/_app.js"
export type RouterOutputs = inferRouterOutputs<typeof appRouter>
export type RouterInputs = inferRouterInputs<typeof appRouter>

export type User = RouterOutputs['user']['list'][number]
export type UserList = RouterOutputs['user']['list']

export type Expense = RouterOutputs['expenses']['list'][number]
export type ExpensesList = RouterOutputs['expenses']['list']
export type InsertExpense = RouterInputs['expenses']['insert']
export type UpdateExpense = RouterInputs['expenses']['update']

export * from "@financial-planner/models"
