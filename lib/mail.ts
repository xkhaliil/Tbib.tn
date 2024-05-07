import { User } from "@prisma/client";
import * as handlebars from "handlebars";
import nodemailer from "nodemailer";
import { Resend } from "resend";

import { ResetPasswordTemplate } from "@/components/templates/reset-password-template";
import { TwoFactorAuthTemplate } from "@/components/templates/two-factor-auth-template";
import { VerifyEmailTemplate } from "@/components/templates/verify-email-template";

import { customTemplate } from "./template/custom";
import { rejectHealthcareProviderTemplate } from "./template/reject";
import { underReviewTemplate } from "./template/under-review";
import { welcomeTemplate } from "./template/welcome";

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
export async function sendVerifiedUserEmail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transporter.verify();
    console.log(testResult);
  } catch (err) {
    console.log(err);
  }
  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (err) {
    console.log(err);
  }
}
export async function sendRejectedUserEmail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transporter.verify();
    console.log(testResult);
  } catch (err) {
    console.log(err);
  }
  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (err) {
    console.log(err);
  }
}
export async function sendCustomEmail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transporter.verify();
    console.log(testResult);
  } catch (err) {
    console.log(err);
  }
  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function compileVerifiedUserEmailTemplate(sendname: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({ sendname: sendname });
  return htmlBody;
}

export async function compileRejectedUserEmailTemplate(sendname: string) {
  const template = handlebars.compile(rejectHealthcareProviderTemplate);
  const htmlBody = template({ sendname: sendname });
  return htmlBody;
}

export async function compileRequestCustomEmailTemplate(
  sendname: string,
  custom: string,
) {
  const template = handlebars.compile(customTemplate);
  const htmlBody = template({ sendname: sendname, custom: custom });
  return htmlBody;
}

export async function compileUnderReviewEmailTemplate(sendname: string) {
  const template = handlebars.compile(underReviewTemplate);
  const htmlBody = template({ sendname: sendname });
  return htmlBody;
}
