"use server";

import { db } from "@/lib/db";

export async function getHealthcareCenterById(id: string) {
  try {
    const healthcareCenter = await db.healthCareCenter.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!healthcareCenter) {
      return { error: "Healthcare center not found" };
    }

    return healthcareCenter;
  } catch (error) {
    console.error("[500] getHealthcareCenterById", error);
  }
}
export async function getAllHealthcareCenters() {
  try {
    const healthcareCenters = await db.healthCareCenter.findMany({
      include: {
        user: true,
      },
    });

    return healthcareCenters;
  } catch (error) {
    console.error("[500] getAllHealthcareCenters", error);
  }
}
export async function getHealthcareCentersCount() {
  try {
    const count = await db.healthCareCenter.count();

    return count;
  } catch (error) {
    console.error("[500] getHealthcareCentersCount", error);
  }
}
export async function getHealthCareCentersByMonth() {
  const users = await db.user.findMany({
    select: {
      createdAt: true,
    },
    where: {
      role: "HEALTHCARE_CENTER",
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
  const HealthCareCentersPerMonth = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames[index],
      totalUsers: users.filter((user) => {
        const date = new Date(user.createdAt);
        return date.getMonth() === index && date.getFullYear() === 2024;
      }).length,
    }));

  return HealthCareCentersPerMonth;
}
export async function totalHealthcareCentersWeeklyWithIncrease() {
  const totalHealthcareCentersInThisWeek = await db.healthCareCenter.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    },
  });

  const totalHealthcareCentersInLastWeek = await db.healthCareCenter.count({
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
    total: totalHealthcareCentersInThisWeek,
    increase:
      totalHealthcareCentersInThisWeek - totalHealthcareCentersInLastWeek,
  };
}
export async function totalHealthcareCentersMonthlyWithIncrease() {
  const totalHealthcareCentersInThisMonth = await db.healthCareCenter.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    },
  });

  const totalHealthcareCentersInLastMonth = await db.healthCareCenter.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
          lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    },
  });

  return {
    total: totalHealthcareCentersInThisMonth,
    increase:
      totalHealthcareCentersInThisMonth - totalHealthcareCentersInLastMonth,
  };
}
export async function totalHealthcareCentersYearlyWithIncrease() {
  const totalHealthcareCentersInThisYear = await db.healthCareCenter.count({
    where: {
      user: {
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    },
  });

  const totalHealthcareCentersInLastYear = await db.healthCareCenter.count({
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
    total: totalHealthcareCentersInThisYear,
    increase:
      totalHealthcareCentersInThisYear - totalHealthcareCentersInLastYear,
  };
}

export async function getHealthcareProvidersByHealthcareCenterId(
  id: string | undefined,
) {
  try {
    const healthcareProviders = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
      where: {
        healthCareCenterId: id,
      },
    });

    return healthcareProviders;
  } catch (error) {
    console.error("[500] getHealthcareProvidersByHealthcareCenterId", error);
  }
}

export async function getHealthcareProviderByHealthcareCenterId(
  id: string | undefined,
) {
  try {
    const healthcareProvider = await db.healthCareProvider.findFirst({
      include: {
        user: true,
      },
      where: {
        healthCareCenterId: id,
      },
    });

    return healthcareProvider;
  } catch (error) {
    console.error("[500] getHealthcareProviderByHealthcareCenterId", error);
  }
}

export async function getHealthcareCenterAppointments(
  healthcareProvidersIds: string[] | undefined,
) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        healthCareProviderId: {
          in: healthcareProvidersIds,
        },
      },
      orderBy: {
        startTime: "asc",
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        healthCareProvider: {
          include: {
            user: true,
          },
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error(
      "[500] getHealthcareCenterAppointmentsByHealthcareProvidersIds",
      error,
    );
  }
}
