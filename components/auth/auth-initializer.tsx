'use client'

import { useAuthStore } from "@/lib/stores/auth.store"
import { useEffect } from "react"

export default function AuthInitializer({ children }: {children: React.ReactNode}) {

  useEffect(() => {
    void useAuthStore.getState().initialize()
  }, [])

  return (<>{children}</>)
}