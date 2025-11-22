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
import {
	EXPENSE_CATEGORIES,
	type Expense,
	type ExpenseCategory,
} from "@/types/expense";
import { Plus, Trash2 } from "lucide-react";

interface ExpenseFormProps {
	onAddExpense?: (expense: Omit<Expense, "id">) => void;
	onUpdateExpense?: (expense: Expense) => void;
	onDeleteExpense?: (id: string) => void;
	expense?: Expense;
	trigger?: React.ReactNode;
}

export function ExpenseForm({
	onAddExpense,
	onUpdateExpense,
	onDeleteExpense,
	expense,
	trigger,
}: ExpenseFormProps) {
	const isEditMode = !!expense;
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState<ExpenseCategory>("Other");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

	// Populate form when editing
	useEffect(() => {
		if (expense) {
			setName(expense.name);
			setAmount(expense.amount.toString());
			setCategory(expense.category as ExpenseCategory);
			setDate(expense.date);
		}
	}, [expense]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !amount) {
			return;
		}

		if (isEditMode && onUpdateExpense && expense) {
			onUpdateExpense({
				...expense,
				name,
				amount: parseFloat(amount),
				category,
				date,
			});
		} else if (onAddExpense) {
			onAddExpense({
				name,
				amount: parseFloat(amount),
				category,
				date,
			});
		}

		// Reset form
		if (!isEditMode) {
			setName("");
			setAmount("");
			setCategory("Other");
			setDate(new Date().toISOString().split("T")[0]);
		}
		setOpen(false);
	};

	const handleDelete = () => {
		if (expense && onDeleteExpense) {
			onDeleteExpense(expense.id);
			setOpen(false);
		}
	};

	const defaultTrigger = (
		<Button>
			<Plus className="mr-2 h-4 w-4" />
			Add Expense
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? "Edit" : "Add"} Monthly Expense
					</DialogTitle>
					<DialogDescription>
						{isEditMode
							? "Update the details of your monthly expense."
							: "Add a new monthly expense to track your spending."}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="e.g., Rent, Netflix, Groceries"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
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
							<Label htmlFor="category">Category</Label>
							<Select
								value={category}
								onValueChange={(value) => setCategory(value as ExpenseCategory)}
							>
								<SelectTrigger id="category">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									{EXPENSE_CATEGORIES.map((cat) => (
										<SelectItem key={cat} value={cat}>
											{cat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
					</div>
					<DialogFooter className={isEditMode ? "justify-between" : ""}>
						{isEditMode && onDeleteExpense && (
							<Button
								type="button"
								variant="destructive"
								onClick={handleDelete}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete Expense
							</Button>
						)}
						<Button type="submit">
							{isEditMode ? "Update" : "Add"} Expense
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
