"use server";

import { db } from "@/lib/db";

export async function getAllDoctors() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    return doctors;
  } catch (error) {
    console.error(error);
  }
}
