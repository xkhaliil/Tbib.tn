"use server";

import { ManageHealthcareProviderProfileSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/lib/auth";
import { db } from "@/lib/db";

import { getCurrentSession } from "./auth";

export const settings = async (
  values: ManageHealthcareProviderProfileSchemaType,
) => {
  const user = await getCurrentSession();

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
export async function getHealthcareProviderByMonth() {
  const users = await db.user.findMany({
    select: {
      createdAt: true,
    },
    where: {
      role: "HEALTHCARE_PROVIDER",
    },
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const HealthCareProviderPerMonth = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames[index],
      totalUsers: users.filter((user) => {
        const date = new Date(user.createdAt);
        return date.getMonth() === index && date.getFullYear() === 2024;
      }).length,
    }));

  return HealthCareProviderPerMonth;
}
export async function getHealthcareProvidersCount() {
  try {
    const count = await db.healthCareProvider.count();

    return count;
  } catch (error) {
    console.error(error);
  }
}
