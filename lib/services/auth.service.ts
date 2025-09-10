import { createClient } from "../supabase/client"
import { ForgotPassword, SignIn, SignUp, UpdatePassword } from '../../types/auth.types'
import { User } from "@supabase/supabase-js"
import { authValidation } from "../schemas/auth.schema"

interface AuthService {
  signIn: (credentials: SignIn) => Promise<User> 
  signUp: (credentials: SignUp) => Promise<User | null>
  signOut: () => Promise<void>
  forgotPassword: (credentials: ForgotPassword) => Promise<void>
  updatePassword: (credentials: UpdatePassword) => Promise<void>
  getCurrentUser: () => Promise<User | null>
}

export const authService: AuthService = {
  async signIn(credentials) {
    const supabase = createClient()
    const { email, password } = authValidation.signIn.parse(credentials)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
  },

  async signUp(credentials) {
    const supabase = createClient()
    const { email, password } = authValidation.signUp.parse(credentials)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data.user
  },

  async signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async forgotPassword(credentials) {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(credentials.email)
    if (error) throw error
  },

  async updatePassword(credentials) {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser(credentials)
    if (error) throw error
  },

  async getCurrentUser() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  }
}