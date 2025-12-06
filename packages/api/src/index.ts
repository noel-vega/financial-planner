import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { appRouter } from "./trpc/_app.js"

export type { AppRouter } from "./trpc/_app.js"
export type RouterOutputs = inferRouterOutputs<typeof appRouter>
export type RouterInputs = inferRouterInputs<typeof appRouter>

// Users
export type User = RouterOutputs['user']['list'][number]
export type UserList = RouterOutputs['user']['list']

// Expenses
export type Expense = RouterOutputs['expenses']['list'][number]
export type ExpensesList = RouterOutputs['expenses']['list']
export type InsertExpense = RouterInputs['expenses']['insert']
export type UpdateExpense = RouterInputs['expenses']['update']

// Goals
export type Goal = RouterOutputs['goals']['list'][number]
export type GoalsList = RouterOutputs['goals']['list']
export type InsertGoal = RouterInputs['goals']['insert']
export type UpdateGoal = RouterInputs['goals']['update']
// export type GoalContribution = RouterOutputs['goals']['list'][number]
// export type GoalContributionsList = RouterOutputs['goals']['list']
// export type InsertGoalContribution = RouterInputs['goals']['insert']
// export type UpdateGoalContribution = RouterInputs['goals']['update']

export * from "@financial-planner/models"
