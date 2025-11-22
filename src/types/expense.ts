export interface Expense {
	id: string;
	name: string;
	amount: number;
	category: string;
	date: string;
}

export type ExpenseCategory =
	| "Housing"
	| "Transportation"
	| "Food"
	| "Utilities"
	| "Entertainment"
	| "Healthcare"
	| "Insurance"
	| "Childcare"
	| "Legal"
	| "Savings"
	| "Debt"
	| "Other";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
	"Housing",
	"Transportation",
	"Food",
	"Utilities",
	"Entertainment",
	"Healthcare",
	"Insurance",
	"Childcare",
	"Legal",
	"Savings",
	"Debt",
	"Other",
];
