import { useState } from "react";
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
import { InsertGoalSchema, type Goal, type InsertGoal } from "@financial-planner/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { queryClient, trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

interface Props {
  goal?: Goal;
  trigger?: React.ReactNode;
}

export function AddGoalForm({
  trigger,
}: Props) {
  const form = useForm<InsertGoal>({
    resolver: zodResolver(InsertGoalSchema)
  })
  const [open, setOpen] = useState(false);
  const addGoalMutation = useMutation(trpc.goals.insert.mutationOptions())

  const handleSubmit = (e: React.FormEvent) => {
    form.handleSubmit(data => {
      addGoalMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(trpc.goals.list.queryOptions())
          form.reset()
          setOpen(false)
        }
      })
    })(e)
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
            Add Financial Goal
          </DialogTitle>
          <DialogDescription>
            Set a new financial goal to work towards.
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
            <Button type="submit">Add Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
