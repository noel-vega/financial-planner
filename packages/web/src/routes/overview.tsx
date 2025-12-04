import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { GoalList } from "@/components/GoalList";
import { useData } from "@/contexts/DataContext";

export const Route = createFileRoute("/overview")({
	component: OverviewPage,
});

function OverviewPage() {
	const {
		goals,
		expenses,
		monthlyIncome,
		users,
		addUser,
		updateUser,
		deleteUser,
		addGoal,
		updateGoal,
		deleteGoal,
		addContribution,
		updateContribution,
		deleteContribution,
	} = useData();

	const totalExpenses = useMemo(() => {
		return expenses.reduce((sum, expense) => sum + expense.amount, 0);
	}, [expenses]);

	return (
		<div className="container mx-auto py-8 px-4 max-w-6xl">
			<div className="space-y-8">
				<ExecutiveSummary
					monthlyIncome={monthlyIncome}
					totalExpenses={totalExpenses}
					goals={goals}
					users={users}
					onAddUser={addUser}
					onUpdateUser={updateUser}
					onDeleteUser={deleteUser}
				/>

				<GoalList
					goals={goals}
					onDeleteGoal={deleteGoal}
					onUpdateGoal={updateGoal}
					onAddGoal={addGoal}
					onAddContribution={addContribution}
					onUpdateContribution={updateContribution}
					onDeleteContribution={deleteContribution}
				/>
			</div>
		</div>
	);
}
