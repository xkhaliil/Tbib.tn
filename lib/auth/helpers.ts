import { ExtendedUser } from "@/next-auth";
import { Role } from "@prisma/client";

/**
 * This function is used to check if the current user has the required role
 * @param user
 * @param role
 * @returns {boolean}
 */
export function userHasRole(user: ExtendedUser, role: Role): boolean {
  return user.role === role;
}
