import { createClient } from '@supabase/supabase-js'

// Create a single shared instance for tests so auth session is shared
let testClientInstance: ReturnType<typeof createClient> | null = null

export const createTestClient = () => {
  if (!testClientInstance) {
    testClientInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: true // Keep session for sharing between auth and DB operations
        }
      }
    )
  }
  return testClientInstance
}