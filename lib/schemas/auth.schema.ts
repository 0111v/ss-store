import { z } from "zod";

export const authValidation = {
  user: z.object({
    id: z.string(),
    email: z.string(),
    created_at: z.string()
  }),

  signIn: z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(6, 'password must be at least 6 characters')
  }),

  signUp: z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(6, 'password must be at least 6 characters'),
    repeatPassword: z.string(),
  }).refine((data) => data.password === data.repeatPassword, { 
    message: `Password don't match`, 
    path: ['repeatPassword']
  }),

  forgotPassword: z.object({
    email: z.email('Please enter a valid email')
  }),

  updatePassword: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters')
  }),
}