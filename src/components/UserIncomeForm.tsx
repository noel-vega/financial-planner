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
import { PAY_FREQUENCIES, type User, type PayFrequency } from "@/types/user";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface UserIncomeFormProps {
	onAddUser?: (user: Omit<User, "id">) => void;
	onUpdateUser?: (user: User) => void;
	onDeleteUser?: (id: string) => void;
	user?: User;
	trigger?: React.ReactNode;
}

export function UserIncomeForm({
	onAddUser,
	onUpdateUser,
	onDeleteUser,
	user,
	trigger,
}: UserIncomeFormProps) {
	const isEditMode = !!user;
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [incomeAmount, setIncomeAmount] = useState("");
	const [payFrequency, setPayFrequency] = useState<PayFrequency>("bi-weekly");

	// Populate form when editing
	useEffect(() => {
		if (user) {
			setName(user.name);
			setIncomeAmount(user.incomeAmount.toString());
			setPayFrequency(user.payFrequency);
		}
	}, [user]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !incomeAmount) {
			return;
		}

		if (isEditMode && onUpdateUser && user) {
			onUpdateUser({
				...user,
				name,
				incomeAmount: parseFloat(incomeAmount),
				payFrequency,
			});
		} else if (onAddUser) {
			onAddUser({
				name,
				incomeAmount: parseFloat(incomeAmount),
				payFrequency,
			});
		}

		// Reset form
		if (!isEditMode) {
			setName("");
			setIncomeAmount("");
			setPayFrequency("bi-weekly");
		}
		setOpen(false);
	};

	const handleDelete = () => {
		if (user && onDeleteUser) {
			onDeleteUser(user.id);
			setOpen(false);
		}
	};

	const defaultTrigger = isEditMode ? (
		<Button variant="ghost" size="icon" className="h-8 w-8">
			<Pencil className="h-4 w-4" />
		</Button>
	) : (
		<Button variant="outline" size="sm">
			<Plus className="mr-2 h-4 w-4" />
			Add Income Source
		</Button>
	);

	const getPayFrequencyLabel = (frequency: PayFrequency) => {
		switch (frequency) {
			case "weekly":
				return "Weekly";
			case "bi-weekly":
				return "Bi-weekly (every 2 weeks)";
			case "monthly":
				return "Monthly";
			case "annual":
				return "Annual";
			default:
				return frequency;
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isEditMode ? "Edit" : "Add"} Income Source</DialogTitle>
					<DialogDescription>
						{isEditMode
							? "Update income details for this person."
							: "Add a new income source to your household."}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="user-name">Name</Label>
							<Input
								id="user-name"
								placeholder="e.g., John, Jane"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="pay-frequency">Pay Frequency</Label>
							<Select
								value={payFrequency}
								onValueChange={(value) =>
									setPayFrequency(value as PayFrequency)
								}
							>
								<SelectTrigger id="pay-frequency">
									<SelectValue placeholder="Select pay frequency" />
								</SelectTrigger>
								<SelectContent>
									{PAY_FREQUENCIES.map((freq) => (
										<SelectItem key={freq} value={freq}>
											{getPayFrequencyLabel(freq)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="income-amount">
								Income per{" "}
								{payFrequency === "bi-weekly" ? "paycheck" : "period"}
							</Label>
							<Input
								id="income-amount"
								type="number"
								step="0.01"
								placeholder="0.00"
								value={incomeAmount}
								onChange={(e) => setIncomeAmount(e.target.value)}
								required
								min="0"
							/>
							<p className="text-xs text-muted-foreground">
								Amount earned per pay period
							</p>
						</div>
					</div>
					<DialogFooter className={isEditMode ? "justify-between" : ""}>
						{isEditMode && onDeleteUser && (
							<Button
								type="button"
								variant="destructive"
								onClick={handleDelete}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</Button>
						)}
						<Button type="submit">
							{isEditMode ? "Update" : "Add"} Income Source
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
