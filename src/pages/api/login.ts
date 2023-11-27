import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import { ironOptions } from "src/lib/config"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const user = req.body.user as string
  if (user !== "vedant" && user !== "manoj" && user !== "kiran") {
    res.status(400).json({ error: "user not registered, contact maintainer" })
    return
  }

  const password = req.body.password as string
  if (password !== process.env.PASSWORD) {
    res.status(400).json({ error: "incorrect password" })
    return
  }

  req.session.user = { id: 1, name: user }
  await req.session.save()

  res.status(200).end()
}

export default withIronSessionApiRoute(handler, ironOptions)
