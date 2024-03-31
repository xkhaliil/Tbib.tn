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
