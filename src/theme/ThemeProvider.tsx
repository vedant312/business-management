import React, { useCallback, useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material"
import { StylesProvider } from "@mui/styles"

import { themeCreator } from "./base"

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ThemeContext = React.createContext((themeName: string): void => {})

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const curThemeName = "PureLightTheme"
  const [themeName, _setThemeName] = useState(curThemeName)
  const theme = themeCreator(themeName)
  const setThemeName = (themename: string): void => {
    localStorage.setItem("appTheme", themename)
    _setThemeName(themename)
  }
  // wrap the theme in a usecallback to prevent rerenders
  const setThemeNameCallback = useCallback(setThemeName, [])

  useEffect(() => {
    const localThemeName = localStorage.getItem("appTheme")
    if (localThemeName) {
      setThemeName(localThemeName)
    }
  }, [])

  const { children } = props

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeNameCallback}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  )
}

export default ThemeProviderWrapper
