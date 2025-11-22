import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface IncomeSummaryProps {
	monthlyIncome: number;
	totalExpenses: number;
}

export function IncomeSummary({
	monthlyIncome,
	totalExpenses,
}: IncomeSummaryProps) {
	const remaining = monthlyIncome - totalExpenses;
	const percentageUsed =
		monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	return (
		<div className="grid gap-4 md:grid-cols-3 mb-6">
			<Card>
				<CardHeader className="pb-3">
					<CardDescription>Monthly Income</CardDescription>
					<CardTitle className="text-3xl">
						{formatCurrency(monthlyIncome)}
					</CardTitle>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader className="pb-3">
					<CardDescription>Total Expenses</CardDescription>
					<CardTitle className="text-3xl">
						{formatCurrency(totalExpenses)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">
						{percentageUsed.toFixed(1)}% of income
					</div>
				</CardContent>
			</Card>

			<Card
				className={remaining < 0 ? "border-destructive" : "border-green-500"}
			>
				<CardHeader className="pb-3">
					<CardDescription>Remaining</CardDescription>
					<CardTitle
						className={`text-3xl ${remaining < 0 ? "text-destructive" : "text-green-600"}`}
					>
						{formatCurrency(remaining)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">
						{remaining < 0 ? "Over budget!" : "Available to save or spend"}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
