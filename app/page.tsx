import { Hero1 } from "@/components/hero1"
import { AuthButton } from "@/components/auth-button"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"


export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
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
        <div className="flex-1 flex flex-col max-w-7xl p-5">
          <Hero1 />
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              SS STORE
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
