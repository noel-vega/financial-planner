import { config } from 'dotenv';
config({ path: "../../.env" })

import express from "express"
import { db, usersTable } from "@financial-planner/db"

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const users = await db.select().from(usersTable)
  res.json(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

