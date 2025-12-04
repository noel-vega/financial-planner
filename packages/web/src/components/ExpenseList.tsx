import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Expense } from "@/types/expense";
import { Pencil, Filter, Receipt } from "lucide-react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseChart } from "@/components/ExpenseChart";

interface ExpenseListProps {
	expenses: Expense[];
	onDeleteExpense: (id: string) => void;
	onUpdateExpense: (expense: Expense) => void;
	onAddExpense: (expense: Omit<Expense, "id">) => void;
}

export function ExpenseList({
	expenses,
	onDeleteExpense,
	onUpdateExpense,
	onAddExpense,
}: ExpenseListProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("All");

	const filteredExpenses = useMemo(() => {
		if (selectedCategory === "All") {
			return expenses;
		}
		return expenses.filter((expense) => expense.category === selectedCategory);
	}, [expenses, selectedCategory]);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const getCategoryColor = (category: string) => {
		const colors: Record<string, string> = {
			Housing: "bg-blue-500",
			Transportation: "bg-green-500",
			Food: "bg-yellow-500",
			Utilities: "bg-purple-500",
			Entertainment: "bg-pink-500",
			Healthcare: "bg-red-500",
			Insurance: "bg-indigo-500",
			Childcare: "bg-cyan-500",
			Legal: "bg-amber-500",
			Savings: "bg-emerald-500",
			Debt: "bg-orange-500",
			Other: "bg-gray-500",
		};
		return colors[category] || "bg-gray-500";
	};

	// Get unique categories from expenses
	const availableCategories = useMemo(() => {
		const categories = new Set(expenses.map((e) => e.category));
		return Array.from(categories).sort();
	}, [expenses]);

	return (
		<div>
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h2 className="text-2xl font-bold">Monthly Expenses</h2>
					<p className="text-muted-foreground">
						Track and manage your monthly expenses
					</p>
				</div>
				<ExpenseForm onAddExpense={onAddExpense} />
			</div>

			{expenses.length === 0 ? (
				<Card>
					<CardContent className="text-center py-12 text-muted-foreground">
						<Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>No expenses added yet. Click "Add Expense" to get started.</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-6">
					{/* Pie Chart */}
					<ExpenseChart expenses={expenses} />

					{/* Category Filter */}
					<div>
						<div className="flex items-center gap-2 mb-3">
							<Filter className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Filter by Category</span>
						</div>
						<div className="flex flex-wrap gap-2">
							<Button
								variant={selectedCategory === "All" ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedCategory("All")}
							>
								All ({expenses.length})
							</Button>
							{availableCategories.map((category) => {
								const count = expenses.filter(
									(e) => e.category === category,
								).length;
								return (
									<Button
										key={category}
										variant={
											selectedCategory === category ? "default" : "outline"
										}
										size="sm"
										onClick={() => setSelectedCategory(category)}
									>
										{category} ({count})
									</Button>
								);
							})}
						</div>
					</div>

					{/* Expense List */}
					<div className="space-y-3">
						{filteredExpenses.map((expense) => (
							<Card key={expense.id}>
								<CardContent className="p-4">
									<div className="flex items-center justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<h3 className="font-semibold text-base">
													{expense.name}
												</h3>
												<Badge className={getCategoryColor(expense.category)}>
													{expense.category}
												</Badge>
											</div>
											<div className="text-sm text-muted-foreground">
												{formatDate(expense.date)}
											</div>
										</div>
										<div className="flex items-center gap-3 shrink-0">
											<div className="text-xl font-bold">
												{formatCurrency(expense.amount)}
											</div>
											<ExpenseForm
												expense={expense}
												onUpdateExpense={onUpdateExpense}
												onDeleteExpense={onDeleteExpense}
												trigger={
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
													>
														<Pencil className="h-4 w-4" />
													</Button>
												}
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
