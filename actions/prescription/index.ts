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

export async function getPrescriptionById(id: string | undefined) {
  try {
    const prescription = await db.prescription.findUnique({
      where: {
        id,
      },
      include: {
        medications: true,
      },
    });

    return prescription;
  } catch (error) {
    console.error(error);
  }
}
