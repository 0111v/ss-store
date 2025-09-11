'use client'

import Link from "next/link";
import { AuthButton } from "../auth-button";
import { ThemeSwitcher } from "../theme-switcher";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname()
  if (pathname.startsWith('/auth')) return null

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 mb-12">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>SS STORE</Link>
          <div className="flex items-center gap-2">
          </div>
        </div>
        <div className="flex gap-3">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}