"use server";

import { months } from "@/constants";
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
      officeState: values.officeState,
      officeAddress: values.officeAddress,
      officeLatitude: values.officeLatitude,
      officeLongitude: values.officeLongitude,
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
      officeState: updatedHealthCareProvider.officeState || "",
      officeAddress: updatedHealthCareProvider.officeAddress || "",
      officeLatitude: updatedHealthCareProvider.officeLatitude || 0,
      officeLongitude: updatedHealthCareProvider.officeLongitude || 0,
    },
  });

  return { success: "Account updated!" };
};
export async function getHealthcareProvidersByMonth() {
  const users = await db.user.findMany({
    select: {
      createdAt: true,
    },
    where: {
      role: "HEALTHCARE_PROVIDER",
    },
  });

  const HealthCareProviderPerMonth = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: months[index],
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

export async function totalHealthcareProvidersWeeklyWithIncrease() {
  const totalHealthcareProvidersInThisWeek = await db.healthCareProvider.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    },
  });

  const totalHealthcareProvidersInLastWeek = await db.healthCareProvider.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 14)),
          lt: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    },
  });

  return {
    total: totalHealthcareProvidersInThisWeek,
    increase:
      totalHealthcareProvidersInThisWeek - totalHealthcareProvidersInLastWeek,
  };
}

export async function totalHealthcareProvidersMonthlyWithIncrease() {
  const totalHealthcareProvidersInThisMonth = await db.healthCareProvider.count(
    {
      where: {
        user: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      },
    },
  );

  const totalHealthcareProvidersInLastMonth = await db.healthCareProvider.count(
    {
      where: {
        user: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
            lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      },
    },
  );

  return {
    total: totalHealthcareProvidersInThisMonth,
    increase:
      totalHealthcareProvidersInThisMonth - totalHealthcareProvidersInLastMonth,
  };
}

export async function totalHealthcareProvidersYearlyWithIncrease() {
  const totalHealthcareProvidersInThisYear = await db.healthCareProvider.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    },
  });

  const totalHealthcareProvidersInLastYear = await db.healthCareProvider.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
          lt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    },
  });

  return {
    total: totalHealthcareProvidersInThisYear,
    increase:
      totalHealthcareProvidersInThisYear - totalHealthcareProvidersInLastYear,
  };
}

export async function getHealthCareProvidersByMonth() {
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
  const HealthCareProvidersPerMonth = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames[index],
      totalUsers: users.filter((user) => {
        const date = new Date(user.createdAt);
        return date.getMonth() === index && date.getFullYear() === 2024;
      }).length,
    }));

  return HealthCareProvidersPerMonth;
}

export async function getHealthCareProviderById(id: string) {
  const healthCareProvider = await db.healthCareProvider.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      openingHours: true,
      absences: true,
      appointments: true,
    },
  });

  return healthCareProvider;
}

export async function getHealthCareProviderUserAndOpeningHoursAndAbsencesById(
  id: string,
) {
  const healthCareProvider = await db.healthCareProvider.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      openingHours: true,
      absences: true,
    },
  });

  return healthCareProvider;
}

export async function getHealthCareProviderTimeSlots(id: string, date: Date) {
  const INTERVAL = 30;

  const healthCareProvider = await db.healthCareProvider.findUnique({
    where: {
      id,
    },
    include: {
      openingHours: true,
      appointments: {
        where: {
          date: {
            equals: date,
          },
        },
      },
    },
  });

  const openingHours = healthCareProvider?.openingHours;

  const appointments = healthCareProvider?.appointments;

  const day = date.getDay();

  const openingHour = openingHours?.find((hour) => hour.dayOfWeek === day);

  if (!openingHour) {
    return [];
  }

  const slots = [];

  const start = new Date(date);
  start.setHours(openingHour.startTime.getHours());
  start.setMinutes(openingHour.startTime.getMinutes());

  const end = new Date(date);
  end.setHours(openingHour.endTime.getHours());
  end.setMinutes(openingHour.endTime.getMinutes());

  while (start < end) {
    const slot = new Date(start);
    slots.push(slot);
    start.setMinutes(start.getMinutes() + INTERVAL);
  }

  return slots;
}
