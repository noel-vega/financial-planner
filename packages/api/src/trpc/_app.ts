import { db, expensesTable, usersTable, UpdateExpenseSchema, InsertExpenseSchema, IdSchema } from '@financial-planner/db';
import { publicProcedure, router } from './trpc.js';
import { desc, eq } from 'drizzle-orm';

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
  insert: publicProcedure.input(InsertExpenseSchema).mutation(async ({ input }) => {
    return (await db.insert(expensesTable).values(input).returning())[0]
  }),
  update: publicProcedure.input(UpdateExpenseSchema).mutation(async ({ input }) => {
    const { id, ...data } = input
    return (await db.update(expensesTable)
      .set(data)
      .where(eq(expensesTable.id, id)).returning())[0]
  }),
  delete: publicProcedure.input(IdSchema).mutation(async ({ input }) => {
    await db.delete(expensesTable).where(eq(expensesTable.id, input.id))
  })
})

export const appRouter = router({
  user: userRouter,
  expenses: expensesRouter
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
