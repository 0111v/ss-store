"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "@/lib/schemas/auth.schema";
import { ForgotPassword } from "@/types/auth.types";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { LoadingState } from "./ui/loading-state";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [success, setSuccess] = useState(false);
  const { forgotPassword, loading } = useAuthStore()

  const handleForgotPassword = async (values: ForgotPassword) => {
    const ok = await forgotPassword(values)
    setSuccess(ok);
  };

  const form = useForm({
    resolver: zodResolver(authValidation.forgotPassword),
    defaultValues: { email: '' }
  })

  return (
    <LoadingState
      loading={loading}
    >
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        {success ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>Password reset instructions sent</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you registered using your email and password, you will receive
                a password reset email.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription>
                Type in your email and we&apos;ll send you a link to reset your
                password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleForgotPassword)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? "Sending..." : "Send reset email"}
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </LoadingState>
  );
}
