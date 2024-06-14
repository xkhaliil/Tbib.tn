"use server";

import { generateVerificationToken } from "@/actions/verification-token";
import { SignUpSchema, SignUpSchemaType } from "@/schemas";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { sendAccountUnderReviewEmail, sendVerificationEmail } from "@/lib/mail";

export async function signUp(values: SignUpSchemaType) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    name,
    email,
    phone,
    password,
    role,
    speciality,
    state,
    city,
    postalCode,
    verificationDocuments,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "This email is already in use. Please try another." };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      state,
      city,
      postalCode,
    },
  });

  if (user.role === Role.PATIENT) {
    await db.patient.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(user, verificationToken.token);

    return {
      success: `All set, ${user.name}! Please check your email for a verification link.`,
    };
  }

  if (user.role === Role.HEALTHCARE_PROVIDER) {
    await db.healthCareProvider.create({
      data: {
        speciality,
        verificationDocuments,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await sendAccountUnderReviewEmail(user);

    return {
      success: `All set, ${user.name}! We will review your application and get back to you soon.`,
    };
  }

  if (user.role === Role.HEALTHCARE_CENTER) {
    await db.healthCareCenter.create({
      data: {
        verificationDocuments,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await sendAccountUnderReviewEmail(user);

    return {
      success: `All set, ${user.name}! We will review your application and get back to you soon.`,
    };
  }
}
