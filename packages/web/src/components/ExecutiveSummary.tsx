import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Target, CreditCard } from "lucide-react";
import type { Goal } from "@/types/goal";
import type { User } from "@/types/user";
import { UserIncomeDialog } from "@/components/UserIncomeDialog";

interface ExecutiveSummaryProps {
	monthlyIncome: number;
	totalExpenses: number;
	goals: Goal[];
	users: User[];
	onAddUser: (user: Omit<User, "id">) => void;
	onUpdateUser: (user: User) => void;
	onDeleteUser: (id: string) => void;
}

export function ExecutiveSummary({
	monthlyIncome,
	totalExpenses,
	goals,
	users,
	onAddUser,
	onUpdateUser,
	onDeleteUser,
}: ExecutiveSummaryProps) {
	// Calculate total monthly goal commitments
	const totalGoalCommitments = goals.reduce(
		(sum, goal) => sum + goal.monthlyCommitment,
		0,
	);

	const monthlyRemaining = monthlyIncome - totalExpenses - totalGoalCommitments;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div>
			<div className="mb-6">
				<h2 className="text-3xl font-bold">Financial Overview</h2>
				<p className="text-muted-foreground">Your monthly budget breakdown</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<UserIncomeDialog
					users={users}
					onAddUser={onAddUser}
					onUpdateUser={onUpdateUser}
					onDeleteUser={onDeleteUser}
				>
					<Card className="cursor-pointer hover:bg-muted/50 transition-colors">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Monthly Income
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatCurrency(monthlyIncome)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{users.length} income{" "}
								{users.length === 1 ? "source" : "sources"} • Click to manage
							</p>
						</CardContent>
					</Card>
				</UserIncomeDialog>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Expenses
						</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(totalExpenses)}
						</div>
						<p className="text-xs text-muted-foreground">
							{monthlyIncome > 0
								? `${((totalExpenses / monthlyIncome) * 100).toFixed(1)}% of income`
								: "0% of income"}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Goal Commitments
						</CardTitle>
						<Target className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(totalGoalCommitments)}
						</div>
						<p className="text-xs text-muted-foreground">
							{monthlyIncome > 0
								? `${((totalGoalCommitments / monthlyIncome) * 100).toFixed(1)}% of income`
								: "0% of income"}
						</p>
					</CardContent>
				</Card>
			</div>

			{monthlyRemaining < 0 && (
				<div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
					<p className="text-sm text-destructive font-semibold">
						⚠️ Warning: Your expenses and commitments exceed your income by{" "}
						{formatCurrency(Math.abs(monthlyRemaining))}
					</p>
				</div>
			)}

			{monthlyRemaining > 0 && (
				<div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
					<p className="text-sm text-green-800 dark:text-green-200">
						✓ You have {formatCurrency(monthlyRemaining)} remaining after
						expenses and commitments
					</p>
				</div>
			)}
		</div>
	);
}
