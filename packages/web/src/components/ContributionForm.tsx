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
import type { GoalContribution } from "@financial-planner/api";

interface ContributionFormProps {
  goalName: string;
  contribution?: GoalContribution;
  trigger?: React.ReactNode;
}

export function ContributionForm({
  goalName,
  trigger,
}: ContributionFormProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (_: React.FormEvent) => {

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
          <DialogTitle>Add Contribution</DialogTitle>
          <DialogDescription>
            {`Record a contribution to ${goalName}`}
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
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Input
                id="note"
                placeholder="e.g., January savings"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Add Contribution
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
