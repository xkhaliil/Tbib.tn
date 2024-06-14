import { getAppointmentById } from "@/actions/appointment";
import {
  getHealthcareCenterByUserId,
  getHealthcareProviderByUserId,
  getPatientByUserId,
  getUserByHealthcareProviderId,
} from "@/actions/auth";
import { User } from "@prisma/client";
import { render } from "@react-email/components";
import * as handlebars from "handlebars";
import nodemailer from "nodemailer";

import { AccountDeletedTemplate } from "@/components/templates/account-deleted-template";
import { AccountUnderReviewTemplate } from "@/components/templates/account-under-review-template";
import { AccountVerifiedTemplate } from "@/components/templates/account-verified-template";
import { CancelledAppointmentHPTemplate } from "@/components/templates/cancelled-appointment-hp-template";
import { CancelledAppointmentTemplate } from "@/components/templates/cancelled-appointment-template";
import { NewAppointmentTemplate } from "@/components/templates/new-appointment-template";
import { ResetPasswordTemplate } from "@/components/templates/reset-password-template";
import { TeamInvitationTemplate } from "@/components/templates/team-invitation-template";
import { TwoFactorAuthTemplate } from "@/components/templates/two-factor-auth-template";
import { VerifyEmailTemplate } from "@/components/templates/verify-email-template";

import { customTemplate } from "./template/custom";
import { rejectHealthcareProviderTemplate } from "./template/reject";

export async function sendVerificationEmail(user: User, token: string) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(
    VerifyEmailTemplate({ user, verificationToken: token }),
  );

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `Verify your email address`,
    html: template,
  });

  transporter.close();
}

export async function sendAccountUnderReviewEmail(user: User) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(AccountUnderReviewTemplate({ user }));

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `Your Account Is Under Review`,
    html: template,
  });

  transporter.close();
}

export async function sendAccountVerifiedEmail(user: User) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(AccountVerifiedTemplate({ user }));

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `Your Account Has Been Verified`,
    html: template,
  });

  transporter.close();
}

export async function sendPasswordResetEmail(user: User, token: string) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(
    ResetPasswordTemplate({ user, verificationToken: token }),
  );

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `Reset Password`,
    html: template,
  });

  transporter.close();
}

export async function sendTwoFactorAuthEmail(user: User, token: string) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(
    TwoFactorAuthTemplate({ user, verificationCode: token }),
  );

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `Two Factor Authentication Code`,
    html: template,
  });

  transporter.close();
}

export async function sendTeamInvitationEmail(
  healthcareCenter: Awaited<ReturnType<typeof getHealthcareCenterByUserId>>,
  healthcareProvider: Awaited<ReturnType<typeof getUserByHealthcareProviderId>>,
) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(
    TeamInvitationTemplate({ healthcareCenter, healthcareProvider }),
  );

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: healthcareProvider?.email as string,
    subject: `Team Invitation`,
    html: template,
  });

  transporter.close();
}

export async function sendNewAppointmentEmail(
  user: User,
  patient: Awaited<ReturnType<typeof getPatientByUserId>>,
) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(NewAppointmentTemplate({ user, patient }));

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `New Appointment`,
    html: template,
  });

  transporter.close();
}

export async function sendCancelledAppointmentToPatientEmail(
  patient: Awaited<ReturnType<typeof getPatientByUserId>>,
  healthcareProvider: Awaited<ReturnType<typeof getHealthcareProviderByUserId>>,
  appointment: Awaited<ReturnType<typeof getAppointmentById>>,
) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(
    CancelledAppointmentTemplate({
      patient,
      healthcareProvider,
      appointment,
    }),
  );

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: patient?.user.email as string,
    subject: `Appointment Cancelled`,
    html: template,
  });

  transporter.close();
}

export async function sendCancelledAppointmentToPatientsEmails(
  patients: Awaited<ReturnType<typeof getPatientByUserId>>[],
  healthcareProvider: Awaited<ReturnType<typeof getHealthcareProviderByUserId>>,
  appointments: Awaited<ReturnType<typeof getAppointmentById>>[],
) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  for (let i = 0; i < patients.length; i++) {
    const template = render(
      CancelledAppointmentTemplate({
        patient: patients[i],
        healthcareProvider,
        appointment: appointments[i],
      }),
    );

    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: patients[i]?.user.email as string,
      subject: `Appointment Cancelled`,
      html: template,
    });
  }

  transporter.close();
}

export async function sendCancelledAppointmentToHPEmail(
  healthcareProvider: Awaited<ReturnType<typeof getUserByHealthcareProviderId>>,
  patient: Awaited<ReturnType<typeof getPatientByUserId>>,
  appointment: Awaited<ReturnType<typeof getAppointmentById>>,
) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(
    CancelledAppointmentHPTemplate({
      healthcareProvider,
      patient,
      appointment,
    }),
  );

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: healthcareProvider?.email as string,
    subject: `Appointment Cancelled`,
    html: template,
  });

  transporter.close();
}

export async function sendDeletedAccountEmail(user: User) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const template = render(AccountDeletedTemplate({ user }));

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to: user.email as string,
    subject: `Your Account Has Been Deleted`,
    html: template,
  });

  transporter.close();
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

export async function compileRequestCustomEmailTemplate(
  sendname: string,
  custom: string,
) {
  const template = handlebars.compile(customTemplate);
  const htmlBody = template({ sendname: sendname, custom: custom });
  return htmlBody;
}
