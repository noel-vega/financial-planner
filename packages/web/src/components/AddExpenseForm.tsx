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
	InsertExpenseSchema,
	type InsertExpense,
} from "@financial-planner/api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { queryClient, trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface ExpenseFormProps {
	trigger?: React.ReactNode;
}

export function AddExpenseForm({ trigger }: ExpenseFormProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<InsertExpense>({
		resolver: zodResolver(InsertExpenseSchema),
	});
	const insertExpenseMutation = useMutation(
		trpc.expenses.insert.mutationOptions(),
	);

	const handleSubmit = (e: React.FormEvent) => {
		form.handleSubmit((data) => {
			insertExpenseMutation.mutate(data, {
				onSuccess: () => {
					queryClient.invalidateQueries(trpc.expenses.list.queryOptions());
					form.reset();
					setOpen(false);
				},
			});
		})(e);
	};

	const defaultTrigger = (
		<Button disabled={insertExpenseMutation.isPending}>
			<Plus className="mr-2 h-4 w-4" />
			Add Monthly Expense
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px]"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Add Monthly Expense</DialogTitle>
					<DialogDescription>
						Add a new monthly expense to track your spending.
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
						<Button type="submit" disabled={insertExpenseMutation.isPending}>
							{insertExpenseMutation.isPending ? "Adding..." : "Add Expense"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
