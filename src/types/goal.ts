export interface Contribution {
	id: string;
	amount: number;
	date: string;
	note?: string;
}

export interface Goal {
	id: string;
	name: string;
	targetAmount: number;
	category: GoalCategory;
	monthlyCommitment: number;
	contributions: Contribution[];
}

export type GoalCategory =
	| "Emergency Fund"
	| "Vacation"
	| "Down Payment"
	| "Retirement"
	| "Education"
	| "Vehicle"
	| "Wedding"
	| "Debt Payoff"
	| "Investment"
	| "Other";

export const GOAL_CATEGORIES: GoalCategory[] = [
	"Emergency Fund",
	"Vacation",
	"Down Payment",
	"Retirement",
	"Education",
	"Vehicle",
	"Wedding",
	"Debt Payoff",
	"Investment",
	"Other",
];

// Helper function to calculate current amount from contributions
export function getCurrentAmount(goal: Goal): number {
	return goal.contributions.reduce(
		(sum, contribution) => sum + contribution.amount,
		0,
	);
}

// Calculate projected completion date based on monthly commitment
export function getProjectedCompletionDate(goal: Goal): Date | null {
	const currentAmount = getCurrentAmount(goal);
	const remaining = goal.targetAmount - currentAmount;

	if (remaining <= 0) return new Date(); // Goal already complete - return today
	if (goal.monthlyCommitment <= 0) return null; // No commitment set - cannot calculate

	const monthsNeeded = Math.ceil(remaining / goal.monthlyCommitment);
	const projectedDate = new Date();
	projectedDate.setMonth(projectedDate.getMonth() + monthsNeeded);

	return projectedDate;
}

// Calculate months until completion
export function getMonthsToCompletion(goal: Goal): number {
	const currentAmount = getCurrentAmount(goal);
	const remaining = goal.targetAmount - currentAmount;

	if (remaining <= 0) return 0; // Already complete
	if (goal.monthlyCommitment <= 0) return Infinity; // Cannot calculate

	return Math.ceil(remaining / goal.monthlyCommitment);
}

// Calculate goal status - either active, on-hold, or complete
export function getGoalStatus(goal: Goal): "active" | "on-hold" | "complete" {
	const currentAmount = getCurrentAmount(goal);

	// Check if complete
	if (currentAmount >= goal.targetAmount) return "complete";

	// Check if on hold (no monthly commitment set)
	if (goal.monthlyCommitment === 0) return "on-hold";

	// Otherwise, goal is active
	return "active";
}
