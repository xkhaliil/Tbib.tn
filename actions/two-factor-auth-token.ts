import crypto from "crypto";

import { db } from "@/lib/db";

export async function getTwoFactorAuthTokenByToken(token: string) {
  try {
    const twoFactorAuthToken = await db.twoFactorAuthToken.findUnique({
      where: {
        token,
      },
    });

    return twoFactorAuthToken;
  } catch (error) {
    console.error(error);
  }
}

export async function getTwoFactorAuthTokenByEmail(email: string) {
  try {
    const twoFactorAuthToken = await db.twoFactorAuthToken.findFirst({
      where: {
        email,
      },
    });

    return twoFactorAuthToken;
  } catch (error) {
    console.error(error);
  }
}

export async function generateTwoFactorAuthToken(email: string) {
  try {
    const token = crypto.randomInt(100000, 999999).toString();

    // TODO: Set the expiration time to 15 minutes
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingTwoFactorAuthToken =
      await getTwoFactorAuthTokenByEmail(email);

    if (existingTwoFactorAuthToken) {
      await db.twoFactorAuthToken.delete({
        where: {
          id: existingTwoFactorAuthToken.id,
        },
      });
    }

    const twoFactorAuthToken = await db.twoFactorAuthToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return twoFactorAuthToken;
  } catch (error) {
    console.error(error);
  }
}
