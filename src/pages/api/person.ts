import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import parse from "src/lib/parse"
import { ironOptions } from "src/lib/config"
import { Person } from "src/constants/models"
import { addPerson, updatePerson } from "src/lib/api/person"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Person | { error: string }>
) => {
  const { user } = req.session
  if (!user) {
    res.status(401).json({ error: "User not logged in" })
    return
  }

  try {
    switch (req.method) {
      case "POST": {
        const person = parse(req.body, "person") as Person
        const result = await addPerson(person)

        if (result.acknowledged) res.status(200).json(person)
        else res.status(500).json({ error: "Error adding person" })
        break
      }
      case "PUT": {
        const person = parse(req.body, "person") as Person
        const result = await updatePerson(person)

        if (result.acknowledged) res.status(200).json(person)
        else res.status(500).json({ error: "Error updating person" })
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
