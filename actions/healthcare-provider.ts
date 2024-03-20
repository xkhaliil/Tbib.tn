"use server";

import { unstable_update } from "@/auth";
import { ManageHealthcareProviderProfileSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const settings = async (
  values: ManageHealthcareProviderProfileSchemaType,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const healthCareProvider = await db.healthCareProvider.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!healthCareProvider) {
    return { error: "Unauthorized" };
  }

  if (
    values.password &&
    values.newPassword &&
    healthCareProvider.user.password
  ) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      healthCareProvider.user.password,
    );

    if (!passwordsMatch) {
      return {
        error: "Incorrect password. Please enter your current password.",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedHealthCareProvider = await db.healthCareProvider.update({
    where: {
      userId: user.id,
    },
    data: {
      user: {
        update: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          image: values.image,
          bio: values.bio,
          state: values.state,
          city: values.city,
          postalCode: values.postalCode,
          isTwoFactorEnabled: values.isTwoFactorEnabled,
        },
      },
      speciality: values.speciality,
      spokenLanguages: values.spokenLanguages,
    },
    include: {
      user: true,
    },
  });

  unstable_update({
    user: {
      name: updatedHealthCareProvider.user.name,
      email: updatedHealthCareProvider.user.email,
      phone: updatedHealthCareProvider.user.phone || "",
      image: updatedHealthCareProvider.user.image || "",
      bio: updatedHealthCareProvider.user.bio || "",
      speciality: updatedHealthCareProvider.speciality || "",
      spokenLanguages: updatedHealthCareProvider.spokenLanguages || [],
      state: updatedHealthCareProvider.user.state || "",
      city: updatedHealthCareProvider.user.city || "",
      postalCode: updatedHealthCareProvider.user.postalCode || "",
      isTwoFactorEnabled: updatedHealthCareProvider.user.isTwoFactorEnabled,
    },
  });

  return { success: "Account updated!" };
};
