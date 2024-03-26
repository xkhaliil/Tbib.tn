"use server";

import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch (error) {
    console.error(error);
  }
}

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch (error) {
    console.error(error);
  }
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return passwordResetToken;
}

export async function resetPassword(
  values: ResetPasswordSchemaType,
  token?: string | null,
) {
  if (!token) {
    return { error: "Missing token." };
  }

  const result = ResetPasswordSchema.safeParse(values);

  if (!result.success) {
    return {
      error: "Invalid fields.",
    };
  }

  const { password } = result.data;

  const existingResetToken = await getPasswordResetTokenByToken(token);

  if (!existingResetToken) {
    return { error: "Invalid token." };
  }

  const hasExpired = new Date(existingResetToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired." };
  }

  const existingUser = await db.user.findFirst({
    where: {
      email: existingResetToken.email,
    },
  });

  if (!existingUser) {
    return { error: "User not found." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingResetToken.id,
    },
  });

  return { success: "Password has been reset." };
}
