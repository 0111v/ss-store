import { Hero1 } from "@/components/hero1"

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">

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
