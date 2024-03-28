"use server";

import { getTwoFactorAuthConfirmationTokenByUserId } from "@/actions/two-factor-auth-confirmation-token";
import {
  generateTwoFactorAuthToken,
  getTwoFactorAuthTokenByEmail,
} from "@/actions/two-factor-auth-token";
import { generateVerificationToken } from "@/actions/verification-token";
import { SignInSchema, SignInSchemaType } from "@/schemas";
import { Role } from "@prisma/client";
import { AuthError } from "next-auth";

import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendTwoFactorAuthEmail, sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: SignInSchemaType,
  callbackUrl?: string | null,
) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, verificationCode } = validatedFields.data;

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });

  let defaultRedirectUrl = "/dashboard";

  if (existingUser?.role === Role.HEALTHCARE_PROVIDER) {
    defaultRedirectUrl = "/hp/dashboard";
  }

  if (existingUser?.role === Role.HEALTHCARE_CENTER) {
    defaultRedirectUrl = "/hc/dashboard";
  }

  if (existingUser?.role === Role.PATIENT) {
    defaultRedirectUrl = "/patient/dashboard";
  }

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if (
    existingUser.role === Role.HEALTHCARE_PROVIDER &&
    !existingUser.emailVerified
  ) {
    return {
      info: "Hi there! We're still verifying your application. We'll reach out to you soon!",
    };
  }

  if (
    existingUser.role === Role.HEALTHCARE_CENTER &&
    !existingUser.emailVerified
  ) {
    return {
      info: "Hi there! We're still verifying your application. We'll reach out to you soon!",
    };
  }

  if (existingUser.role === Role.PATIENT && !existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(existingUser, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (verificationCode) {
      const twoFactorToken = await getTwoFactorAuthTokenByEmail(
        existingUser.email,
      );

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== verificationCode) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorAuthToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation =
        await getTwoFactorAuthConfirmationTokenByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorAuthConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorAuthConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorAuthToken(
        existingUser.email,
      );

      if (!twoFactorToken) {
        return { error: "Something went wrong!" };
      }

      await sendTwoFactorAuthEmail(existingUser, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || defaultRedirectUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
