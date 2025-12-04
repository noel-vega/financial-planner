import type { User } from "@financial-planner/api";

export type PayFrequency = "weekly" | "bi-weekly" | "monthly";

export const PAY_FREQUENCIES: PayFrequency[] = [
  "weekly",
  "bi-weekly",
  "monthly",
];

/**
 * Convert any pay frequency to monthly income
 */
export function calculateMonthlyIncome(
  biWeeklyIncome: number,
): number {
  return (biWeeklyIncome * 26) / 12;
}

/**
 * Calculate total monthly income from multiple users
 */
export function calculateTotalMonthlyIncome(users: User[]): number {
  return users.reduce(
    (total, user) =>
      total + calculateMonthlyIncome(user.biWeeklyIncome),
    0,
  );
}
