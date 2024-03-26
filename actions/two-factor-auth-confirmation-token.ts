import { db } from "@/lib/db";

export async function getTwoFactorAuthConfirmationTokenByUserId(
  userId: string,
) {
  try {
    const twoFactorAuthConfirmationToken =
      await db.twoFactorAuthConfirmation.findUnique({
        where: {
          userId,
        },
      });

    return twoFactorAuthConfirmationToken;
  } catch (error) {
    console.error(error);
  }
}
