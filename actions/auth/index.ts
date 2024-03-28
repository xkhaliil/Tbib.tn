"use server";

import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { auth, signOut } from "@/lib/auth";
import { userHasRole } from "@/lib/auth/helpers";
import { db } from "@/lib/db";

export async function getCurrentSession() {
  const session = await auth();
  return session?.user;
}

export async function isUserLoggedIn() {
  const session = await auth();
  const userIsLoggedIn = Boolean(session);
  return userIsLoggedIn;
}

export async function logout() {
  await signOut({ redirectTo: "/auth/sign-in" });
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserByEmail(email: string | undefined | null) {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email || "",
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserAccountById(userId: string) {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getHealthcareProviderById(userId: string) {
  try {
    const healthcareProvider = await db.healthCareProvider.findFirst({
      where: {
        userId,
      },
    });

    return healthcareProvider;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * This function is used to check if the current user is signed in and has the required role.
 * If the user is not signed in, the user will be redirected to the sign-in page.
 * @param Role
 * @returns {Promise<{ authorized: boolean; session: Object }>}
 */
export async function requireAuth(
  role: Role,
): Promise<{ authorized: boolean; session: Object }> {
  const session = await auth();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  if (!userHasRole(session.user, role)) {
    return { authorized: false, session };
  }

  return { authorized: true, session };
}
