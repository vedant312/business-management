import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import parse from "src/lib/parse"
import { ironOptions } from "src/lib/config"
import { Site } from "src/constants/models"
import { addSite, updateSite } from "src/lib/api/site"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Site | { error: string }>
) => {
  const { user } = req.session
  if (!user) {
    res.status(401).json({ error: "User not logged in" })
    return
  }

  try {
    switch (req.method) {
      case "POST": {
        const site = parse(req.body, "site") as Site
        const result = await addSite(site)

        if (result.acknowledged) res.status(200).json(site)
        else res.status(500).json({ error: "Error adding site" })
        break
      }
      case "PUT": {
        const site = parse(req.body, "site") as Site
        const result = await updateSite(site)

        if (result.acknowledged) res.status(200).json(site)
        else res.status(500).json({ error: "Error updating site" })
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
