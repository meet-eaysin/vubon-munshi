"use client";

import { authClient } from "@/features/auth/services/auth-client";

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  return {
    user: session?.user,
    session,
    isLoading: isPending,
    isAuthenticated: !!session,
  };
}
