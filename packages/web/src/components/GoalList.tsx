import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  getCurrentAmount,
  getProjectedCompletionDate,
  getGoalStatus,
  getMonthsToCompletion,
} from "@/types/goal";
import {
  Pencil,
  Target,
  DollarSign,
  Circle,
  Pause,
  CheckCircle2,
} from "lucide-react";
import { AddGoalForm } from "@/components/AddGoalForm";
import { ContributionForm } from "@/components/ContributionForm";
import { ContributionList } from "@/components/ContributionList";
import type { Goal } from "@financial-planner/api";
import { UpdateGoalForm } from "./UpdateGoalForm";

interface GoalListProps {
  goals: Goal[];
}

export function GoalList({
  goals,
}: GoalListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Goals</h2>
          <p className="text-muted-foreground">
            Track your progress towards financial goals
          </p>
        </div>
        <AddGoalForm />
      </div>

      {goals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No goals set yet. Click "Add Goal" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = getProgressPercentage(
              getCurrentAmount(goal),
              goal.targetAmount,
            );
            const isComplete = progress >= 100;
            const projectedDate = getProjectedCompletionDate(goal);
            const monthsToComplete = getMonthsToCompletion(goal);
            const status = getGoalStatus(goal);

            const statusConfig = {
              active: {
                icon: Circle,
                color: "text-blue-600",
                label: "Active",
              },
              complete: {
                icon: CheckCircle2,
                color: "text-emerald-600",
                label: "Complete",
              },
              "on-hold": {
                icon: Pause,
                color: "text-gray-500",
                label: "On Hold",
              },
            };

            const StatusIcon = statusConfig[status].icon;

            return (
              <Card key={goal.id}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{goal.name}</h3>
                        <div
                          className={`flex items-center gap-1 text-xs ${statusConfig[status].color}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          <span>{statusConfig[status].label}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Monthly commitment:{" "}
                        {goal.monthlyCommitment > 0
                          ? formatCurrency(goal.monthlyCommitment)
                          : "Not set"}
                      </div>
                      {!isComplete && projectedDate && status !== "on-hold" && (
                        <div className="text-sm text-muted-foreground">
                          Projected completion:{" "}
                          {formatDate(
                            projectedDate.toISOString().split("T")[0],
                          )}
                          {monthsToComplete > 0 &&
                            monthsToComplete !== Infinity && (
                              <span className="ml-2">
                                ({monthsToComplete}{" "}
                                {monthsToComplete === 1 ? "month" : "months"})
                              </span>
                            )}
                        </div>
                      )}
                      {status === "on-hold" && (
                        <div className="text-sm text-muted-foreground italic">
                          Set a monthly commitment to activate this goal
                        </div>
                      )}
                    </div>
                    <UpdateGoalForm
                      goal={goal}
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCurrency(getCurrentAmount(goal))} of{" "}
                        {formatCurrency(goal.targetAmount)}
                      </span>
                      <span className="font-semibold">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm gap-3">
                      <span className="text-muted-foreground">
                        {formatCurrency(
                          goal.targetAmount - getCurrentAmount(goal),
                        )}{" "}
                        remaining
                      </span>

                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 shrink-0 font-semibold border-2 shadow-sm hover:shadow-md transition-all hover:bg-secondary"
                          >
                            <DollarSign className="mr-1.5 h-4 w-4" />
                            {goal.contributions.length === 0
                              ? "Add First Contribution"
                              : `Contributions (${goal.contributions.length})`}
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-h-[85vh]">
                          <DrawerHeader className="border-b">
                            <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
                              <div>
                                <DrawerTitle>
                                  {goal.name} - Contributions
                                </DrawerTitle>
                                <DrawerDescription>
                                  Track your progress towards this goal
                                </DrawerDescription>
                              </div>
                              <ContributionForm goalName={goal.name} />
                            </div>
                          </DrawerHeader>
                          <div className="overflow-y-auto p-6">
                            {goal.contributions.length === 0 ? (
                              <div className="text-center py-12 text-muted-foreground">
                                <p className="mb-4">No contributions yet</p>
                                <p className="text-sm">
                                  Click "Add Contribution" above to get started
                                </p>
                              </div>
                            ) : (
                              <ContributionList
                                goalName={goal.name}
                                contributions={goal.contributions}
                              />
                            )}
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
