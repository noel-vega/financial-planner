import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Expense } from "@financial-planner/api";

interface ExpenseCardListProps {
	expenses: Expense[];
}

export function ExpenseCardList({ expenses }: ExpenseCardListProps) {
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

	return (
		<div className="space-y-3">
			{expenses.map((expense) => (
				<Card key={expense.id}>
					<CardContent className="p-4">
						<div className="flex items-center justify-between gap-4">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<h3 className="font-semibold text-base">{expense.name}</h3>
									<Badge className={getCategoryColor(expense.category)}>
										{expense.category}
									</Badge>
								</div>
								<div className="text-sm text-muted-foreground">
									{formatDate(expense.createdAt)}
								</div>
							</div>
							<div className="flex items-center gap-3 shrink-0">
								<div className="text-xl font-bold">
									{formatCurrency(expense.amount)}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
