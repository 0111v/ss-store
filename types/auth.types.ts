import { authValidation } from "@/lib/schemas/auth.schema";
import { z } from "zod";

export type User = z.infer<typeof authValidation.user>
export type SignIn = z.infer<typeof authValidation.signIn>
export type SignUp = z.infer<typeof authValidation.signUp>
export type ForgotPassword = z.infer<typeof authValidation.forgotPassword>
export type UpdatePassword = z.infer<typeof authValidation.updatePassword>