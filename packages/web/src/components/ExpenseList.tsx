import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { ExpenseTable } from "@/components/ExpenseTable";
import { ExpenseCardList } from "@/components/ExpenseCardList";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Expense } from "@financial-planner/api";
import { AddExpenseForm } from "./AddExpenseForm";

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories
  const availableCategories = useMemo(() => {
    const categories = new Set(expenses.map((e) => e.category));
    return Array.from(categories).sort();
  }, [expenses]);

  // Filter expenses based on search and category
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesCategory =
        categoryFilter === "all" || expense.category === categoryFilter;

      const matchesSearch =
        searchTerm === "" ||
        expense.name.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesCategory && matchesSearch;
    });
  }, [expenses, searchTerm, categoryFilter]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Monthly Expenses</h2>
          <p className="text-muted-foreground">
            Track and manage your monthly expenses
          </p>
        </div>
      </div>

      {/* Filters - Shared by both mobile and desktop */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AddExpenseForm />
      </div>


      {expenses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No expenses added yet. Click "Add Expense" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {/* Mobile */}
          <div className="md:hidden">
            <ExpenseCardList expenses={filteredExpenses} />
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <ExpenseTable expenses={filteredExpenses} />
          </div>
        </div>
      )}
    </div>
  );
}
