export type PayFrequency = "weekly" | "bi-weekly" | "monthly" | "annual";

export interface User {
	id: string;
	name: string;
	incomeAmount: number;
	payFrequency: PayFrequency;
}

export const PAY_FREQUENCIES: PayFrequency[] = [
	"weekly",
	"bi-weekly",
	"monthly",
	"annual",
];

/**
 * Convert any pay frequency to monthly income
 */
export function calculateMonthlyIncome(
	amount: number,
	frequency: PayFrequency,
): number {
	switch (frequency) {
		case "weekly":
			return (amount * 52) / 12;
		case "bi-weekly":
			return (amount * 26) / 12;
		case "monthly":
			return amount;
		case "annual":
			return amount / 12;
		default:
			return 0;
	}
}

/**
 * Calculate total monthly income from multiple users
 */
export function calculateTotalMonthlyIncome(users: User[]): number {
	return users.reduce(
		(total, user) =>
			total + calculateMonthlyIncome(user.incomeAmount, user.payFrequency),
		0,
	);
}
