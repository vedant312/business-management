// /middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession } from "iron-session/edge"

import { ironOptions } from "src/lib/config"

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()

  const session = await getIronSession(req, res, ironOptions)
  const { user } = session
  if (!user) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)) // redirect to /unauthorized page
  }

  return res
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
