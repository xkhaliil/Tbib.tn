"use server";

import { db } from "@/lib/db";

export async function getHealthcareCenterById(id: string) {
  try {
    const healthcareCenter = await db.healthCareCenter.findUnique({
      where: {
        id,
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
