import { createFileRoute } from "@tanstack/react-router";
import { ExpenseList } from "@/components/ExpenseList";
import { useData } from "@/contexts/DataContext";

export const Route = createFileRoute("/expenses")({
	component: ExpensesPage,
});

function ExpensesPage() {
	const { expenses, addExpense, updateExpense, deleteExpense } = useData();

	return (
		<div className="container mx-auto py-8 px-4 max-w-6xl">
			<ExpenseList
				expenses={expenses}
				onDeleteExpense={deleteExpense}
				onUpdateExpense={updateExpense}
				onAddExpense={addExpense}
			/>
		</div>
	);
}
