import { db, usersTable } from '@financial-planner/db';
import { publicProcedure, router } from './trpc.js';

export const appRouter = router({
  users: publicProcedure.query(async () => {
    const users = await db.select().from(usersTable)
    return users
  }),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
