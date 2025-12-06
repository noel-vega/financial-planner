import { useEffect, useState } from "react";
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
import { Plus } from "lucide-react";
import { UpdateGoalSchema, type Goal, type UpdateGoal } from "@financial-planner/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { queryClient, trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

interface Props {
  goal: Goal;
  trigger?: React.ReactNode;
}

export function UpdateGoalForm({
  trigger,
  goal
}: Props) {
  const form = useForm<UpdateGoal>({
    resolver: zodResolver(UpdateGoalSchema),
    defaultValues: goal
  })
  const [open, setOpen] = useState(false);
  const updateGoalMutation = useMutation(trpc.goals.update.mutationOptions())
  const deleteGoalMutation = useMutation(trpc.goals.delete.mutationOptions())

  const handleSubmit = (e: React.FormEvent) => {
    form.handleSubmit(data => {
      updateGoalMutation.mutate(data, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(trpc.goals.list.queryOptions())
          form.reset()
          setOpen(false)
        }
      })
    })(e)
  };

  const handleDelete = () => {
    deleteGoalMutation.mutate(goal, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.goals.list.queryOptions());
        setOpen(false);
      },
    });
  };

  const defaultTrigger = (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Goal
    </Button>
  );

  useEffect(() => {
    form.reset(goal);
  }, [goal, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            Update Financial Goal
          </DialogTitle>
          <DialogDescription>
            Update existing financial goal to work towards.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input
                id="goal-name"
                placeholder="e.g., Emergency Fund, New Car"
                required
                {...form.register("name")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target-amount">Target Amount</Label>
              <Input
                id="target-amount"
                type="number"
                step="1"
                placeholder="0.00"
                required
                {...form.register("targetAmount", { valueAsNumber: true })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="monthly-commitment">Monthly Commitment</Label>
              <Input
                id="monthly-commitment"
                type="number"
                step="1"
                placeholder="0.00"
                required
                {...form.register("monthlyCommitment", { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground">
                How much you plan to contribute each month
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!form.formState.isDirty}>Update Goal</Button>

            <Button
              type="button"
              disabled={deleteGoalMutation.isPending}
              variant="destructive"
              onClick={handleDelete}
            >
              {deleteGoalMutation.isPending
                ? "Deleting..."
                : "Delete Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
