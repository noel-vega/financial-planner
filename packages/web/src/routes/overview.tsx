import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { GoalList } from "@/components/GoalList";
import { useData } from "@/contexts/DataContext";
import { queryClient, trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { calculateTotalMonthlyIncome } from "@/types/user";

export const Route = createFileRoute("/overview")({
  beforeLoad: async () => {
    await queryClient.ensureQueryData(trpc.users.queryOptions())
  },
  component: OverviewPage,
});

function OverviewPage() {
  const {
    goals,
    expenses,
    addGoal,
    updateGoal,
    deleteGoal,
    addContribution,
    updateContribution,
    deleteContribution,
  } = useData();
  const usersListQuery = useQuery(trpc.users.queryOptions())

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const monthlyIncome = calculateTotalMonthlyIncome(usersListQuery.data ?? []);
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-8">
        <ExecutiveSummary
          monthlyIncome={monthlyIncome}
          totalExpenses={totalExpenses}
          goals={goals}
          users={usersListQuery.data ?? []}
        />

        <GoalList
          goals={goals}
          onDeleteGoal={deleteGoal}
          onUpdateGoal={updateGoal}
          onAddGoal={addGoal}
          onAddContribution={addContribution}
          onUpdateContribution={updateContribution}
          onDeleteContribution={deleteContribution}
        />
      </div>
    </div>
  );
}
