import { createContext, useContext, useState, type ReactNode } from "react";
import type { Goal, Contribution } from "../types/goal";
import { initialGoals } from "@/data/initial-data";

interface DataContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id">) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  addContribution: (
    goalId: string,
    contribution: Omit<Contribution, "id">,
  ) => void;
  updateContribution: (goalId: string, contribution: Contribution) => void;
  deleteContribution: (goalId: string, contributionId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  // Calculate total monthly income from all users

  const addGoal = (goal: Omit<Goal, "id">) => {
    const newGoal: Goal = {
      ...goal,
      id: crypto.randomUUID(),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const addContribution = (
    goalId: string,
    contribution: Omit<Contribution, "id">,
  ) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            contributions: [
              ...goal.contributions,
              {
                ...contribution,
                id: crypto.randomUUID(),
              },
            ],
          };
        }
        return goal;
      }),
    );
  };

  const updateContribution = (
    goalId: string,
    updatedContribution: Contribution,
  ) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            contributions: goal.contributions.map((contribution) =>
              contribution.id === updatedContribution.id
                ? updatedContribution
                : contribution,
            ),
          };
        }
        return goal;
      }),
    );
  };

  const deleteContribution = (goalId: string, contributionId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            contributions: goal.contributions.filter(
              (contribution) => contribution.id !== contributionId,
            ),
          };
        }
        return goal;
      }),
    );
  };

  return (
    <DataContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        addContribution,
        updateContribution,
        deleteContribution,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
