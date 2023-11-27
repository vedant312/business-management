import type { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"

import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "src/lib/api/material"
import parse from "src/lib/parse"
import { ironOptions } from "src/lib/config"
import { Material } from "src/constants/models"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Material | { error: string }>
) => {
  const { user } = req.session
  if (!user) {
    res.status(401).json({ error: "User not logged in" })
    return
  }

  try {
    switch (req.method) {
      case "POST": {
        const material = parse(req.body, "material") as Material
        const result = await addMaterial(material)

        if (result.acknowledged) res.status(200).json(material)
        else res.status(500).json({ error: "Error adding material" })
        break
      }
      case "PUT": {
        const material = parse(req.body, "material") as Material
        const result = await updateMaterial(material)

        if (result.acknowledged) res.status(200).json(material)
        else res.status(500).json({ error: "Error updating material" })
        break
      }
      case "DELETE": {
        const id = req.query.id as string
        const result = await deleteMaterial(id)

        if (result.acknowledged) res.status(200)
        else res.status(500).json({ error: "Error deleting material" })
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
