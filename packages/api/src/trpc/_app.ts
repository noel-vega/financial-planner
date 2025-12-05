import { db, expensesTable, UpSertExpenseSchema, usersTable, } from '@financial-planner/db';
import { publicProcedure, router } from './trpc.js';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

export const userRouter = router({
  list: publicProcedure.query(async () => {
    const users = await db.select().from(usersTable)
    return users
  }),
});

export const expensesRouter = router({
  list: publicProcedure.query(async () => {
    const expenses = await db.select().from(expensesTable).orderBy(desc(expensesTable.createdAt))
    return expenses
  }),
  insert: publicProcedure.input(UpSertExpenseSchema).mutation(async ({ input }) => {
    return (await db.insert(expensesTable).values(input).returning())[0]
  }),
  update: publicProcedure.input(z.object({
    id: z.number(),
    data: UpSertExpenseSchema
  })).mutation(async (opts) => {
    const { input } = opts
    return (await db.update(expensesTable)
      .set(input.data)
      .where(eq(expensesTable.id, input.id)).returning())[0]
  })
})

export const appRouter = router({
  user: userRouter,
  expenses: expensesRouter
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
