import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import parse from "src/lib/parse"
import { ironOptions } from "src/lib/config"
import { Expense } from "src/constants/models"
import { addExpense, deleteExpense, updateExpense } from "src/lib/api/expense"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Expense | { error: string }>
) => {
  const { user } = req.session
  if (!user) {
    res.status(401).json({ error: "User not logged in" })
    return
  }

  try {
    switch (req.method) {
      case "POST": {
        const expense = parse(req.body, "expense") as Expense
        const result = await addExpense(expense)

        if (result.acknowledged) res.status(200).json(expense)
        else res.status(500).json({ error: "Error adding expense" })
        break
      }
      case "PUT": {
        const expense = parse(req.body, "expense") as Expense
        const result = await updateExpense(expense)

        if (result.acknowledged) res.status(200).json(expense)
        else res.status(500).json({ error: "Error updating expense" })
        break
      }
      case "DELETE": {
        const id = req.query.id as string
        const result = await deleteExpense(id)

        if (result.acknowledged) res.status(200)
        else res.status(500).json({ error: "Error deleting expense" })
        break
      }
      default:
        res.status(405).json({ error: "Method not allowed" })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
