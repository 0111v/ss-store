import { ForgotPassword, SignIn, SignUp, UpdatePassword } from "@/types/auth.types";
import { create } from "zustand";
import { authService } from "../services/auth.service";
import { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  initialized: boolean
}

interface AuthActions {
  signIn: (credentials: SignIn) => Promise<boolean> 
  signUp: (credentials: SignUp) => Promise<boolean>
  signOut: () => Promise<boolean>
  forgotPassword: (credentials: ForgotPassword) => Promise<boolean>
  updatePassword: (credentials: UpdatePassword) => Promise<boolean>
  getCurrentUser: () => Promise<boolean>
  initialize: () => Promise<boolean>
}

type AuthStore = AuthState & AuthActions


export const useAuthStore = create<AuthStore>((set) => {
  const run = async (fn: () => Promise<void>) => {
    set({ loading: true, error: null })
    try {
      await fn()
      return true
    } catch (error) {
      set({error: error instanceof Error ? error.message : 'Unknown error'})
      return false
    } finally {
      set({ loading: false })
    }
  }

  return {
    user: null,
    loading: false,
    error: null,
    initialized: false,

    signIn: (credentials) => 
      run(async () => {
        const user = await authService.signIn(credentials)
        set({ user })
      }),

    signUp: (credentials) => 
      run(async () => {
        const user =  await authService.signUp(credentials)
        set({ user })
      }),

    signOut: () => 
      run(async () => {
        await authService.signOut()
        set({ user: null })
      }),

    forgotPassword: (credentials) => 
      run(async () => {
        await authService.forgotPassword(credentials)
      }),

    updatePassword: (credentials) => 
      run(async () => {
        await authService.updatePassword(credentials)
      }),

    getCurrentUser: () => 
      run(async() => {
        const user = await authService.getCurrentUser()
        set({ user })
      }),

    initialize: () =>
      run(async () => {
        const user = await authService.getCurrentUser()
        set({ user, initialized: true})
      })
  }
})