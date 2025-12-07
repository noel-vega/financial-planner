import "dotenv/config";
import { db, expensesTable, usersTable } from "./index.js";
import type { InsertExpense, InsertUser } from "./types/index.js";

async function main() {
	const users: InsertUser[] = [
		{
			name: "Noel",
			biWeeklyIncome: 2_350,
		},
		{
			name: "Grecia",
			biWeeklyIncome: 0,
		},
	];
	await db.insert(usersTable).values(users);

	const expenses: InsertExpense[] = [
		{
			name: "Rent",
			amount: 900,
			category: "Housing",
		},
	];

	await db.insert(expensesTable).values(expenses);
}

main();
