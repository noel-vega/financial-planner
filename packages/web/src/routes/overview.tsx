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
    const queryOptions = {
      userList: trpc.user.list.queryOptions(),
      expensesList: trpc.expenses.list.queryOptions()
    }
    const userList = await queryClient.ensureQueryData(queryOptions.userList)
    const expensesList = await queryClient.ensureQueryData(queryOptions.expensesList)
    return {
      initialData: {
        userList, expensesList
      },
      queryOptions
    }
  },
  component: OverviewPage,
});

function OverviewPage() {
  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    addContribution,
    updateContribution,
    deleteContribution,
  } = useData();
  const { initialData, queryOptions } = Route.useRouteContext()
  const usersListQuery = useQuery({ ...queryOptions.userList, initialData: initialData.userList })
  const expensesListQuery = useQuery({ ...queryOptions.expensesList, initialData: initialData.expensesList })

  const totalExpenses = useMemo(() => {
    return expensesListQuery.data.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expensesListQuery.data]);

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
