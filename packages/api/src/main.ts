import { config } from 'dotenv';
config({ path: "../../.env" })

import express from "express"
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

app.get('/health', async (_, res) => {
  res.send("Healthy")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

