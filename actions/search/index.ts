"use server";

import { db } from "@/lib/db";

export interface SearchPageParams {
  speciality?: string;
  location?: string;
}

export async function getHealthcareProvidersByParams(params: SearchPageParams) {
  try {
    const { speciality, location } = params;

    let query: any = {};

    if (speciality) {
      query.speciality = speciality;
    }

    if (location) {
      query.officeState = location;
    }

    const healthcareProviders = await db.healthCareProvider.findMany({
      where: query,
      include: {
        user: true,
        openingHours: true,
        absences: true,
        reviews: true,
      },
    });

    return healthcareProviders;
  } catch (error) {
    console.error("Error fetching healthcare providers", error);
    return [];
  }
}
