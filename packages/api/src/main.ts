import { config } from 'dotenv';
config({ path: "../../.env" })

import express from "express"
import { db, usersTable } from "@financial-planner/db"
import cors from "cors"
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/_app.js';

const app = express()
const port = 3000

app.use(cors({
  origin: ["http://localhost:5173"]
}))


// created for each request
const createContext = () => ({}); // no context


app.use("/trpc", trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
}))

app.get('/', async (_, res) => {
  const users = await db.select().from(usersTable)
  res.json(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

