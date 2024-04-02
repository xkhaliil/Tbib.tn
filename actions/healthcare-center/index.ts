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
