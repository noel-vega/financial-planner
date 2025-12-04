import type { Expense } from "@/types/expense";
import type { Goal } from "@/types/goal";
import type { User } from "@/types/user";

export const initialUsers: User[] = [
	{
		id: "user-1",
		name: "Noel",
		incomeAmount: 2350,
		payFrequency: "bi-weekly",
	},
	{
		id: "user-2",
		name: "Grecia",
		incomeAmount: 250,
		payFrequency: "bi-weekly",
	},
];

export const initialExpenses: Expense[] = [
	{
		id: "expense-1",
		name: "Rent",
		amount: 900,
		category: "Housing",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-2",
		name: "Car Insurance",
		amount: 125,
		category: "Transportation",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-3",
		name: "Food",
		amount: 600,
		category: "Food",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-4",
		name: "Diapers",
		amount: 120,
		category: "Childcare",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-5",
		name: "Wipes",
		amount: 60,
		category: "Childcare",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-6",
		name: "Gas",
		amount: 40,
		category: "Transportation",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-7",
		name: "Noel's Phone",
		amount: 60,
		category: "Utilities",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-8",
		name: "Grecia's Phone",
		amount: 40,
		category: "Utilities",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-9",
		name: "Immigration Lawyer",
		amount: 250,
		category: "Legal",
		date: new Date().toISOString().split("T")[0],
	},
	{
		id: "expense-10",
		name: "Digital Ocean",
		amount: 10,
		category: "Other",
		date: new Date().toISOString().split("T")[0],
	},
];

export const initialGoals: Goal[] = [
	{
		id: "goal-1",
		name: "Emergency Fund",
		targetAmount: 10000,
		category: "Emergency Fund",
		monthlyCommitment: 1000,
		contributions: [
			{
				id: "contrib-1",
				amount: 2000,
				date: "2025-08-31",
				note: "Initial savings transfer",
			},
			{
				id: "contrib-2",
				amount: 1500,
				date: "2025-09-30",
				note: "September contribution",
			},
			{
				id: "contrib-3",
				amount: 1500,
				date: "2025-10-31",
				note: "October contribution",
			},
		],
	},
	{
		id: "goal-2",
		name: "Used Car",
		targetAmount: 6000,
		category: "Vehicle",
		monthlyCommitment: 0,
		contributions: [],
	},
	{
		id: "goal-3",
		name: "House Down Payment",
		targetAmount: 20000,
		category: "Down Payment",
		monthlyCommitment: 0,
		contributions: [],
	},
];
