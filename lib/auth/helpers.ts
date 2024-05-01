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

/**
 * This function is used to check if the current user has completed his profile or not
 * @param user
 * @returns {boolean}
 */
export function userHasCompletedProfile(user: ExtendedUser | null): boolean {
  if (
    !user?.dateOfBirth ||
    !user?.phone ||
    !user?.gender ||
    !user?.state ||
    !user?.city ||
    !user?.postalCode
  ) {
    return false;
  }
  return true;
}
