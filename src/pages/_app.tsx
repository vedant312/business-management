import "../theme/globals.css"
import type { AppProps } from "next/app"
import { CssBaseline } from "@mui/material"
import { NextPage } from "next"
import { FC } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { getIronSession } from "iron-session"

import { SidebarProvider } from "src/contexts/SidebarContext"
import EmptyLayout from "src/layouts/EmptyLayout"
import ThemeProviderWrapper from "src/theme/ThemeProvider"
import { SidebarLayoutProps } from "src/layouts/SidebarLayout"
import { ironOptions } from "src/lib/config"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: FC<SidebarLayoutProps>
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.layout || EmptyLayout
  return (
    <SidebarProvider>
      <ThemeProviderWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </ThemeProviderWrapper>
    </SidebarProvider>
  )
}

export default App
