import { NextRequest, NextResponse } from "next/server";
import { generatePasswordResetToken } from "@/actions/password-reset";
import { ForgotPasswordSchema } from "@/schemas";

import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = ForgotPasswordSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      result.error.issues.map((i) => {
        return {
          message: i.message,
        };
      }),
      { status: 400 },
    );
  }

  const { email } = result.data;

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      {
        message: "Email not found.",
      },
      { status: 404 },
    );
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(existingUser, passwordResetToken.token);

  return NextResponse.json(
    {
      message: "Check your email for a password reset link.",
    },
    { status: 200 },
  );
}
