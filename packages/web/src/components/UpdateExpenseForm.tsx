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
import { EXPENSE_CATEGORIES } from "@/types/expense";
import { Plus } from "lucide-react";
import {
	UpdateExpenseSchema,
	type Expense,
	type UpdateExpense,
} from "@financial-planner/api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { queryClient, trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ExpenseFormProps {
	initialExpense: Expense;
	trigger?: React.ReactNode;
}

export function UpdateExpenseForm({
	trigger,
	initialExpense,
}: ExpenseFormProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<UpdateExpense>({
		resolver: zodResolver(UpdateExpenseSchema),
		defaultValues: initialExpense,
	});
	const updateExpenseMutation = useMutation(
		trpc.expenses.update.mutationOptions(),
	);

	const deleteExpenseMutation = useMutation(
		trpc.expenses.delete.mutationOptions(),
	);

	const handleSubmit = (e: React.FormEvent) => {
		form.handleSubmit((data) => {
			updateExpenseMutation.mutate(data, {
				onSuccess: () => {
					queryClient.invalidateQueries(trpc.expenses.list.queryOptions());
					form.reset();
					setOpen(false);
				},
			});
		})(e);
	};

	const handleDelete = () => {
		deleteExpenseMutation.mutate(initialExpense, {
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.expenses.list.queryOptions());
				setOpen(false);
			},
		});
	};

	const defaultTrigger = (
		<Button disabled={updateExpenseMutation.isPending}>
			<Plus className="mr-2 h-4 w-4" />
			Update Monthly Expense
		</Button>
	);

	useEffect(() => {
		form.reset(initialExpense);
	}, [initialExpense, form]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px]"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Update Monthly Expense</DialogTitle>
					<DialogDescription>
						Update existing monthly expense to track your spending.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								required
								placeholder="e.g., Rent, Netflix, Groceries"
								{...form.register("name")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="amount">Amount</Label>
							<Input
								id="amount"
								step="1"
								placeholder="0.00"
								type="number"
								required
								{...form.register("amount", { valueAsNumber: true })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="category">Category</Label>
							<Controller
								control={form.control}
								name="category"
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger id="category" className="w-full">
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
								)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={updateExpenseMutation.isPending}>
							{updateExpenseMutation.isPending
								? "Updating..."
								: "Update Expense"}
						</Button>
						<Button
							type="button"
							disabled={deleteExpenseMutation.isPending}
							variant="destructive"
							onClick={handleDelete}
						>
							{deleteExpenseMutation.isPending
								? "Deleting..."
								: "Delete Expense"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
