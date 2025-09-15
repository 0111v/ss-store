"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "@/lib/schemas/auth.schema";
import { UpdatePassword } from "@/types/auth.types";
import { LoadingState } from "./ui/loading-state";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { updatePassword, loading } = useAuthStore()
  const router = useRouter();

  const handleForgotPassword = async (values: UpdatePassword) => {
    const ok = await updatePassword(values)
    if (ok) router.push("/products");
  };

  const form = useForm({
    resolver: zodResolver(authValidation.updatePassword),
    defaultValues: { password: '' }
  })

  return (
    <LoadingState
      loading={loading}
    >
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Please enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleForgotPassword)}>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input placeholder="New password" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <Button type="submit" className="w-full mt-4" disabled={loading}>
                  {loading ? "Saving..." : "Save new password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </LoadingState>
  );
}
