/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext, useState } from "react"

type SidebarContext = {
  sidebarToggle: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle)
  }
  const closeSidebar = () => {
    setSidebarToggle(false)
  }

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
