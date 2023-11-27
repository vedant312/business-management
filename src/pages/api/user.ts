import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import { ironOptions } from "src/lib/config"
import { getUserByID } from "src/lib/api/user"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    { name: string; avatar: string; jobtitle: string } | { error: string }
  >
) => {
  const { user } = req.session
  if (!user) {
    res.status(401).json({ error: "User not logged in" })
  }
  const admin = getUserByID(user?.name || "")
  res.status(200).json({ ...admin })
}

export default withIronSessionApiRoute(handler, ironOptions)
