"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";

export function LogoutButton() {
  const { signOut } = useAuthStore()
  const router = useRouter();

  const logout = async () => {
    const ok = await signOut()
    if (ok) router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
