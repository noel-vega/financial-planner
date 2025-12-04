import { createContext, useContext, useState, type ReactNode } from "react";
import {
	initialExpenses,
	initialGoals,
	initialUsers,
} from "../data/initial-data";
import type { Expense } from "../types/expense";
import type { Goal, Contribution } from "../types/goal";
import type { User } from "../types/user";
import { calculateTotalMonthlyIncome } from "../types/user";

interface DataContextType {
	expenses: Expense[];
	goals: Goal[];
	users: User[];
	monthlyIncome: number;
	addUser: (user: Omit<User, "id">) => void;
	updateUser: (user: User) => void;
	deleteUser: (id: string) => void;
	addExpense: (expense: Omit<Expense, "id">) => void;
	updateExpense: (expense: Expense) => void;
	deleteExpense: (id: string) => void;
	addGoal: (goal: Omit<Goal, "id">) => void;
	updateGoal: (goal: Goal) => void;
	deleteGoal: (id: string) => void;
	addContribution: (
		goalId: string,
		contribution: Omit<Contribution, "id">,
	) => void;
	updateContribution: (goalId: string, contribution: Contribution) => void;
	deleteContribution: (goalId: string, contributionId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
	const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
	const [goals, setGoals] = useState<Goal[]>(initialGoals);
	const [users, setUsers] = useState<User[]>(initialUsers);

	// Calculate total monthly income from all users
	const monthlyIncome = calculateTotalMonthlyIncome(users);

	const addUser = (user: Omit<User, "id">) => {
		const newUser: User = {
			...user,
			id: crypto.randomUUID(),
		};
		setUsers((prev) => [...prev, newUser]);
	};

	const updateUser = (updatedUser: User) => {
		setUsers((prev) =>
			prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
		);
	};

	const deleteUser = (id: string) => {
		setUsers((prev) => prev.filter((user) => user.id !== id));
	};

	const addExpense = (expense: Omit<Expense, "id">) => {
		const newExpense: Expense = {
			...expense,
			id: crypto.randomUUID(),
		};
		setExpenses((prev) => [...prev, newExpense]);
	};

	const updateExpense = (updatedExpense: Expense) => {
		setExpenses((prev) =>
			prev.map((expense) =>
				expense.id === updatedExpense.id ? updatedExpense : expense,
			),
		);
	};

	const deleteExpense = (id: string) => {
		setExpenses((prev) => prev.filter((expense) => expense.id !== id));
	};

	const addGoal = (goal: Omit<Goal, "id">) => {
		const newGoal: Goal = {
			...goal,
			id: crypto.randomUUID(),
		};
		setGoals((prev) => [...prev, newGoal]);
	};

	const updateGoal = (updatedGoal: Goal) => {
		setGoals((prev) =>
			prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
		);
	};

	const deleteGoal = (id: string) => {
		setGoals((prev) => prev.filter((goal) => goal.id !== id));
	};

	const addContribution = (
		goalId: string,
		contribution: Omit<Contribution, "id">,
	) => {
		setGoals((prev) =>
			prev.map((goal) => {
				if (goal.id === goalId) {
					return {
						...goal,
						contributions: [
							...goal.contributions,
							{
								...contribution,
								id: crypto.randomUUID(),
							},
						],
					};
				}
				return goal;
			}),
		);
	};

	const updateContribution = (
		goalId: string,
		updatedContribution: Contribution,
	) => {
		setGoals((prev) =>
			prev.map((goal) => {
				if (goal.id === goalId) {
					return {
						...goal,
						contributions: goal.contributions.map((contribution) =>
							contribution.id === updatedContribution.id
								? updatedContribution
								: contribution,
						),
					};
				}
				return goal;
			}),
		);
	};

	const deleteContribution = (goalId: string, contributionId: string) => {
		setGoals((prev) =>
			prev.map((goal) => {
				if (goal.id === goalId) {
					return {
						...goal,
						contributions: goal.contributions.filter(
							(contribution) => contribution.id !== contributionId,
						),
					};
				}
				return goal;
			}),
		);
	};

	return (
		<DataContext.Provider
			value={{
				expenses,
				goals,
				users,
				monthlyIncome,
				addUser,
				updateUser,
				deleteUser,
				addExpense,
				updateExpense,
				deleteExpense,
				addGoal,
				updateGoal,
				deleteGoal,
				addContribution,
				updateContribution,
				deleteContribution,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
