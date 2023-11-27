import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import { ironOptions } from "src/lib/config"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy()
  res.status(200).end()
}

export default withIronSessionApiRoute(handler, ironOptions)
