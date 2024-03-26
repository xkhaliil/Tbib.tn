import { User } from "@prisma/client";
import { Resend } from "resend";

import { ResetPasswordTemplate } from "@/components/templates/reset-password-template";
import { TwoFactorAuthTemplate } from "@/components/templates/two-factor-auth-template";
import { VerifyEmailTemplate } from "@/components/templates/verify-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(user: User, token: string) {
  await resend.emails.send({
    from: "Auth Toolkit <onboarding@resend.dev>",
    to: user.email as string,
    subject: `Welcome to Auth Toolkit, ${user.name}!. Please verify your email.`,
    react: VerifyEmailTemplate({ user, verificationToken: token }),
    tags: [
      {
        name: "category",
        value: "confirm_email",
      },
    ],
  });
}

export async function sendPasswordResetEmail(user: User, token: string) {
  await resend.emails.send({
    from: "Auth Toolkit <onboarding@resend.dev>",
    to: user.email as string,
    subject: `Password Reset Request`,
    react: ResetPasswordTemplate({ user, verificationToken: token }),
    tags: [
      {
        name: "category",
        value: "password_reset",
      },
    ],
  });
}

export async function sendTwoFactorAuthEmail(user: User, token: string) {
  await resend.emails.send({
    from: "Auth Toolkit <onboarding@resend.dev>",
    to: user.email as string,
    subject: `Two Factor Authentication Code`,
    react: TwoFactorAuthTemplate({ user, verificationCode: token }),
    tags: [
      {
        name: "category",
        value: "two_factor_auth",
      },
    ],
  });
}
