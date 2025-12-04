import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { calculateMonthlyIncome } from "@/types/user";
import { Users } from "lucide-react";
import type { User } from "@financial-planner/api";

interface UserIncomeDialogProps {
  users: User[];
  children: React.ReactNode;
}

export function UserIncomeDialog({
  users,
  children,
}: UserIncomeDialogProps) {
  const [open, setOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalMonthly = users.reduce(
    (sum, user) =>
      sum + calculateMonthlyIncome(user.biWeeklyIncome),
    0,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Monthly Income Breakdown
          </DialogTitle>
          <DialogDescription>
            Manage your household income sources
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Total Summary */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Monthly Income</span>
              <span className="text-2xl font-bold">
                {formatCurrency(totalMonthly)}
              </span>
            </div>
          </Card>

          {/* User List */}
          {users.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No income sources yet</p>
              <p className="text-sm mt-2">
                Click "Add Income Source" to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => {
                const userMonthly = calculateMonthlyIncome(
                  user.biWeeklyIncome,
                );
                return (
                  <Card key={user.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-lg">{user.name}</h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(user.biWeeklyIncome)}{" "}
                          Bi-weekly
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Monthly: {formatCurrency(userMonthly)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {/* <UserIncomeForm */}
                        {/*   user={user} */}
                        {/*   trigger={ */}
                        {/*     <Button variant="ghost" size="sm"> */}
                        {/*       <Pencil className="h-4 w-4" /> */}
                        {/*     </Button> */}
                        {/*   } */}
                        {/* /> */}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
