/* eslint-disable import/prefer-default-export */
import { IronSessionOptions } from "iron-session"

const secret = process.env.SECRET_COOKIE_PASSWORD as string

if (!process.env.SECRET_COOKIE_PASSWORD) {
  throw new Error("SECRET_COOKIE_PASSWORD must be defined")
}

const ironOptions: IronSessionOptions = {
  cookieName: "pole",
  password: secret,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 60,
  },
}

// You may need the next line in some situations
// import * as IronSession from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number
      name: string
    }
  }
}

export { ironOptions }
