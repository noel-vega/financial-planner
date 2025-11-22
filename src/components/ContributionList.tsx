import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Contribution } from "@/types/goal";
import { Trash2, Pencil, DollarSign, Calendar } from "lucide-react";
import { ContributionForm } from "@/components/ContributionForm";

interface ContributionListProps {
	goalName: string;
	contributions: Contribution[];
	onUpdateContribution: (contribution: Contribution) => void;
	onDeleteContribution: (contributionId: string) => void;
}

export function ContributionList({
	goalName,
	contributions,
	onUpdateContribution,
	onDeleteContribution,
}: ContributionListProps) {
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

	const formatMonthYear = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "long",
			year: "numeric",
		});
	};

	if (contributions.length === 0) {
		return (
			<div className="text-sm text-muted-foreground py-2">
				No contributions yet
			</div>
		);
	}

	// Calculate summary stats
	const totalContributed = contributions.reduce((sum, c) => sum + c.amount, 0);

	// Sort contributions by date (newest first)
	const sortedContributions = [...contributions].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<div className="max-w-4xl mx-auto">
			{/* Summary Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
				<Card className="p-4">
					<div className="flex items-center gap-2 mb-2">
						<DollarSign className="h-5 w-5 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">
							Total Contributed
						</span>
					</div>
					<div className="text-2xl font-bold">
						{formatCurrency(totalContributed)}
					</div>
				</Card>
				<Card className="p-4">
					<div className="flex items-center gap-2 mb-2">
						<Calendar className="h-5 w-5 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">Total Count</span>
					</div>
					<div className="text-2xl font-bold">{contributions.length}</div>
				</Card>
			</div>

			{/* Timeline */}
			<div>
				<h3 className="text-lg font-semibold mb-6">Contribution History</h3>
				<div className="relative">
					{/* Timeline Line */}
					<div className="absolute left-6 top-3 bottom-3 w-0.5 bg-border" />

					{/* Timeline Items */}
					<div className="space-y-6">
						{sortedContributions.map((contribution) => (
							<div key={contribution.id} className="relative pl-16">
								{/* Timeline Dot */}
								<div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md z-10" />

								{/* Content */}
								<div className="group">
									<div className="flex items-start justify-between gap-4 pb-6 border-b last:border-0">
										<div className="flex-1 min-w-0">
											<div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
												<span className="text-2xl sm:text-3xl font-bold text-foreground">
													{formatCurrency(contribution.amount)}
												</span>
												<span className="text-sm sm:text-base text-muted-foreground">
													{formatDate(contribution.date)}
												</span>
											</div>
											{contribution.note && (
												<p className="text-sm sm:text-base text-muted-foreground mb-2 break-words">
													{contribution.note}
												</p>
											)}
											<div className="text-xs sm:text-sm text-muted-foreground">
												{formatMonthYear(contribution.date)}
											</div>
										</div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
											<ContributionForm
												goalName={goalName}
												contribution={contribution}
												onUpdateContribution={onUpdateContribution}
												trigger={
													<Button
														variant="outline"
														size="sm"
														className="w-full sm:w-auto"
													>
														<Pencil className="h-4 w-4 mr-2" />
														Edit
													</Button>
												}
											/>
											<Button
												variant="outline"
												size="sm"
												onClick={() => onDeleteContribution(contribution.id)}
												className="text-destructive hover:text-destructive w-full sm:w-auto"
											>
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
