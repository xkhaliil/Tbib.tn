import { auth } from "@/auth";

import { db } from "@/lib/db";

export async function currentUser() {
  const session = await auth();

  return session?.user;
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
