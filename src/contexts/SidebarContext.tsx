import { createContext, useContext, type ReactNode } from "react";
import type { SidebarContextValue, SidebarProviderProps } from "../types";

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children, value }: SidebarProviderProps) {
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}
