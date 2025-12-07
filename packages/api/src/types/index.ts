import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type {
  UpdateExpenseSchema,
  InsertExpenseSchema,
  IdSchema,
  InsertGoalSchema,
  UpdateGoalSchema,
  InsertGoalContributionSchema,
  UpdateGoalContributionSchema,
} from "../schemas/index.js";
import { z } from "zod";
import type { appRouter } from "../trpc/_app.js";

// Types inferred from validation schemas
export type Id = z.infer<typeof IdSchema>;

// Expenses
export type InsertExpense = z.infer<typeof InsertExpenseSchema>;
export type UpdateExpense = z.infer<typeof UpdateExpenseSchema>;

// Goals
export type InsertGoal = z.infer<typeof InsertGoalSchema>;
export type UpdateGoal = z.infer<typeof UpdateGoalSchema>;

// Goal Contributions
export type InsertGoalContribution = z.infer<
  typeof InsertGoalContributionSchema
>;
export type UpdateGoalContribution = z.infer<
  typeof UpdateGoalContributionSchema
>;

export type RouterOutputs = inferRouterOutputs<typeof appRouter>;
export type RouterInputs = inferRouterInputs<typeof appRouter>;

// Users
export type User = RouterOutputs["user"]["list"][number];
export type UserList = RouterOutputs["user"]["list"];

// Expenses
export type Expense = RouterOutputs["expenses"]["list"][number];
export type ExpensesList = RouterOutputs["expenses"]["list"];
export type InsertExpenseParams = RouterInputs["expenses"]["insert"];
export type UpdateExpenseParams = RouterInputs["expenses"]["update"];

// Goals
export type Goal = RouterOutputs["goals"]["list"][number];
export type GoalsList = RouterOutputs["goals"]["list"];
export type InsertGoalParams = RouterInputs["goals"]["insert"];
export type UpdateGoalParams = RouterInputs["goals"]["update"];

// Goal Contributions - imported from db since not exposed in router yet
export type { GoalContribution } from "@financial-planner/db";
