import { auth } from "@/features/auth/services/auth";
import { Role } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Get current user session
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

/**
 * Get current user or redirect to login
 */
export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session.user;
}

/**
 * Require authentication
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

/**
 * Require specific role
 */
export async function requireRole(role: Role) {
  const user = await requireAuth();

  if (user.role !== role) {
    throw new Error("Forbidden: Insufficient permissions");
  }

  return user;
}

/**
 * Check if user has role
 */
export async function hasRole(role: Role) {
  const session = await getSession();
  return session?.user?.role === role;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  return hasRole(Role.ADMIN);
}

/**
 * Check if user is teacher
 */
export async function isTeacher() {
  return hasRole(Role.TEACHER);
}
