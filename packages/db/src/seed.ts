import 'dotenv/config';
import { usersTable, type User } from './db/schema.js';
import { db } from './index.js';

async function main() {
  const users: User[] = [{
    name: 'Noel',
    biWeeklyIncome: 2_350,
  },
  {
    name: 'Grecia',
    biWeeklyIncome: 0,
  }
  ];

  await db.insert(usersTable).values(users);
}

main();

