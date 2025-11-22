import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Contribution } from "@/types/goal";
import { Plus } from "lucide-react";

interface ContributionFormProps {
	goalName: string;
	onAddContribution?: (contribution: Omit<Contribution, "id">) => void;
	onUpdateContribution?: (contribution: Contribution) => void;
	contribution?: Contribution;
	trigger?: React.ReactNode;
}

export function ContributionForm({
	goalName,
	onAddContribution,
	onUpdateContribution,
	contribution,
	trigger,
}: ContributionFormProps) {
	const isEditMode = !!contribution;
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const [note, setNote] = useState("");

	// Populate form when editing
	useEffect(() => {
		if (contribution) {
			setAmount(contribution.amount.toString());
			setDate(contribution.date);
			setNote(contribution.note || "");
		}
	}, [contribution]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!amount) {
			return;
		}

		if (isEditMode && onUpdateContribution && contribution) {
			onUpdateContribution({
				...contribution,
				amount: parseFloat(amount),
				date,
				note: note.trim() || undefined,
			});
		} else if (onAddContribution) {
			onAddContribution({
				amount: parseFloat(amount),
				date,
				note: note.trim() || undefined,
			});
		}

		// Reset form
		if (!isEditMode) {
			setAmount("");
			setDate(new Date().toISOString().split("T")[0]);
			setNote("");
		}
		setOpen(false);
	};

	const defaultTrigger = (
		<Button size="sm" variant="outline">
			<Plus className="mr-2 h-4 w-4" />
			Add Contribution
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isEditMode ? "Edit" : "Add"} Contribution</DialogTitle>
					<DialogDescription>
						{isEditMode
							? `Update contribution to ${goalName}`
							: `Record a contribution to ${goalName}`}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="amount">Amount</Label>
							<Input
								id="amount"
								type="number"
								step="0.01"
								placeholder="0.00"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="date">Date</Label>
							<Input
								id="date"
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="note">Note (optional)</Label>
							<Input
								id="note"
								placeholder="e.g., January savings"
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">
							{isEditMode ? "Update" : "Add"} Contribution
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
