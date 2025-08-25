/**
 * Role-Based Access Control (RBAC) System
 * 
 * This module provides server-side authentication and authorization for the application.
 * It ensures that only users with appropriate roles can access protected resources.
 * 
 * Security Features:
 * - Server-side session validation
 * - Role-based authorization
 * - Automatic redirection for unauthorized access
 * - Type-safe role checking
 */

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Validates user session and checks if user has required role(s)
 * 
 * @param roles - Array of roles that can access the resource (e.g., ['ADMIN', 'USER'])
 * @returns Session object if authorized, null if unauthorized
 * 
 * Usage:
 * - const session = await requireRole(['ADMIN']); // Admin only
 * - const session = await requireRole(['ADMIN', 'USER']); // Both roles
 */
export async function requireRole(roles: ("ADMIN" | "USER")[]) {
  // Get current session from Better Auth using Next.js headers
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null; // No session = unauthorized

  // SECURITY CHECK: Validate user has one of the required roles
  const userRole = session.user.role as "ADMIN" | "USER";
  return roles.includes(userRole) ? session : null; // Return session if authorized
}
