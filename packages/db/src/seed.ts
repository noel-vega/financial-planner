import 'dotenv/config';
import { expensesTable, usersTable, type InsertUser, type UpSertExpense } from '@financial-planner/models';
import { db } from './index.js';

async function main() {
  const users: InsertUser[] = [{
    name: 'Noel',
    biWeeklyIncome: 2_350,
  },
  {
    name: 'Grecia',
    biWeeklyIncome: 0,
  }
  ];
  await db.insert(usersTable).values(users);

  const expenses: UpSertExpense[] = [
    {
      name: "Rent",
      amount: 900,
      category: "Housing",
    }
  ]

  await db.insert(expensesTable).values(expenses);
}

main();

