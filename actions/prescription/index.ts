"use server";

import { db } from "@/lib/db";

export async function getAllPrescriptions(
  healthcareProviderId: string | undefined,
) {
  try {
    const prescriptions = await db.prescription.findMany({
      where: {
        healthCareProviderId: healthcareProviderId,
      },
    });

    return prescriptions;
  } catch (error) {
    console.error(error);
  }
}
