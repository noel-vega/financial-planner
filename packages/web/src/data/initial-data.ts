import type { Goal } from "@/types/goal";



export const initialGoals: Goal[] = [
  {
    id: "goal-1",
    name: "Emergency Fund",
    targetAmount: 10000,
    category: "Emergency Fund",
    monthlyCommitment: 1000,
    contributions: [
      {
        id: "contrib-1",
        amount: 2000,
        date: "2025-08-31",
        note: "Initial savings transfer",
      },
      {
        id: "contrib-2",
        amount: 1500,
        date: "2025-09-30",
        note: "September contribution",
      },
      {
        id: "contrib-3",
        amount: 1500,
        date: "2025-10-31",
        note: "October contribution",
      },
    ],
  },
  {
    id: "goal-2",
    name: "Used Car",
    targetAmount: 6000,
    category: "Vehicle",
    monthlyCommitment: 0,
    contributions: [],
  },
  {
    id: "goal-3",
    name: "House Down Payment",
    targetAmount: 20000,
    category: "Down Payment",
    monthlyCommitment: 0,
    contributions: [],
  },
];
