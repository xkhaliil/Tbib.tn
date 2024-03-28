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
export async function getDoctorById(doctorId: string) {
  try {
    const doctor = await db.healthCareProvider.findUnique({
      where: {
        id: doctorId,
      },
      include: {
        user: true,
      },
    });

    return doctor;
  } catch (error) {
    console.error(error);
  }
}
