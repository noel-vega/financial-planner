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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { GOAL_CATEGORIES, type Goal, type GoalCategory } from "@/types/goal";
import { Plus, Trash2 } from "lucide-react";

interface GoalFormProps {
	onAddGoal?: (goal: Omit<Goal, "id">) => void;
	onUpdateGoal?: (goal: Goal) => void;
	onDeleteGoal?: (id: string) => void;
	goal?: Goal;
	trigger?: React.ReactNode;
}

export function GoalForm({
	onAddGoal,
	onUpdateGoal,
	onDeleteGoal,
	goal,
	trigger,
}: GoalFormProps) {
	const isEditMode = !!goal;
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [targetAmount, setTargetAmount] = useState("");
	const [monthlyCommitment, setMonthlyCommitment] = useState("");
	const [category, setCategory] = useState<GoalCategory>("Other");

	// Populate form when editing
	useEffect(() => {
		if (goal) {
			setName(goal.name);
			setTargetAmount(goal.targetAmount.toString());
			setMonthlyCommitment(goal.monthlyCommitment.toString());
			setCategory(goal.category as GoalCategory);
		}
	}, [goal]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !targetAmount || !monthlyCommitment) {
			return;
		}

		if (isEditMode && onUpdateGoal && goal) {
			onUpdateGoal({
				...goal,
				name,
				targetAmount: parseFloat(targetAmount),
				monthlyCommitment: parseFloat(monthlyCommitment),
				category,
			});
		} else if (onAddGoal) {
			onAddGoal({
				name,
				targetAmount: parseFloat(targetAmount),
				monthlyCommitment: parseFloat(monthlyCommitment),
				category,
				contributions: [],
			});
		}

		// Reset form
		if (!isEditMode) {
			setName("");
			setTargetAmount("");
			setMonthlyCommitment("");
			setCategory("Other");
		}
		setOpen(false);
	};

	const handleDelete = () => {
		if (goal && onDeleteGoal) {
			onDeleteGoal(goal.id);
			setOpen(false);
		}
	};

	const defaultTrigger = (
		<Button>
			<Plus className="mr-2 h-4 w-4" />
			Add Goal
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? "Edit" : "Add"} Financial Goal
					</DialogTitle>
					<DialogDescription>
						{isEditMode
							? "Update your financial goal details."
							: "Set a new financial goal to work towards."}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="goal-name">Goal Name</Label>
							<Input
								id="goal-name"
								placeholder="e.g., Emergency Fund, New Car"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="goal-category">Category</Label>
							<Select
								value={category}
								onValueChange={(value) => setCategory(value as GoalCategory)}
							>
								<SelectTrigger id="goal-category">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									{GOAL_CATEGORIES.map((cat) => (
										<SelectItem key={cat} value={cat}>
											{cat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="target-amount">Target Amount</Label>
							<Input
								id="target-amount"
								type="number"
								step="0.01"
								placeholder="0.00"
								value={targetAmount}
								onChange={(e) => setTargetAmount(e.target.value)}
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="monthly-commitment">Monthly Commitment</Label>
							<Input
								id="monthly-commitment"
								type="number"
								step="0.01"
								placeholder="0.00"
								value={monthlyCommitment}
								onChange={(e) => setMonthlyCommitment(e.target.value)}
								required
							/>
							<p className="text-xs text-muted-foreground">
								How much you plan to contribute each month
							</p>
						</div>
					</div>
					<DialogFooter className={isEditMode ? "justify-between" : ""}>
						{isEditMode && onDeleteGoal && (
							<Button
								type="button"
								variant="destructive"
								onClick={handleDelete}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete Goal
							</Button>
						)}
						<Button type="submit">{isEditMode ? "Update" : "Add"} Goal</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
