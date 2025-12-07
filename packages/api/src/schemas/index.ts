import z from "zod";

// Standalone validation schemas - no dependency on database tables
// These can be used by both frontend and backend

export const IdSchema = z.object({ id: z.number() });

// Expenses
export const InsertExpenseSchema = z.object({
	name: z.string().min(1, "Name is required").max(255),
	category: z.string().min(1).max(255),
	amount: z.number().min(1),
});

export const UpdateExpenseSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Name is required").max(255),
	category: z.string().min(1).max(255),
	amount: z.number().min(1),
});

// Goals
export const InsertGoalSchema = z.object({
	name: z.string().min(1, "Name is required").max(255),
	targetAmount: z.number().min(1),
	monthlyCommitment: z.number().positive(),
});

export const UpdateGoalSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Name is required").max(255),
	targetAmount: z.number().min(1),
	monthlyCommitment: z.number().min(0),
});

// Goal Contributions
export const InsertGoalContributionSchema = z.object({
	goalId: z.number(),
	name: z.string().min(1, "Name is required").max(255),
	amount: z.number().min(1),
	note: z.string().max(255).nullable(),
});

export const UpdateGoalContributionSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Name is required").max(255),
	amount: z.number().min(1),
	note: z.string().max(255).nullable(),
});
