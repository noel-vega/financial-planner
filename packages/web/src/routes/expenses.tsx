import { createFileRoute } from "@tanstack/react-router";
import { ExpenseList } from "@/components/ExpenseList";
import { queryClient, trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/expenses")({
  beforeLoad: async () => {
    const queryOptions = trpc.expenses.list.queryOptions()
    const initialData = await queryClient.ensureQueryData(queryOptions)
    return { initialData, queryOptions }
  },
  component: ExpensesPage,
});

function ExpensesPage() {
  const { initialData, queryOptions } = Route.useRouteContext()
  const expensesQuery = useQuery({ ...queryOptions, initialData })
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <ExpenseList
        expenses={expensesQuery.data}
      />
    </div>
  );
}
