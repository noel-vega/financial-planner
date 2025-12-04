import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { appRouter } from "./trpc/_app.js"

export type { AppRouter } from "./trpc/_app.js"
export type RouterOutputs = inferRouterOutputs<typeof appRouter>
export type RouterInputs = inferRouterInputs<typeof appRouter>

export type User = RouterOutputs['users'][number]
export type UserList = RouterOutputs['users']
