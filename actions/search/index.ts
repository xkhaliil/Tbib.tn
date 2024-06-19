"use server";

import { HealthCareCenter, User } from "@prisma/client";

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
export async function getHealthCareCentersByParams(params: SearchPageParams) {
  const healthcarecenterList: (HealthCareCenter & { user: User } & {
    healthCareProviders: Awaited<
      ReturnType<typeof getHealthcareProvidersByParams>
    >;
  })[] = [];

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
        healthCareCenter: {
          include: {
            user: true,
            healthCareProviders: {
              include: {
                user: true,
                openingHours: true,
                absences: true,
                appointments: true,
                reviews: true,
              },
            },
          },
        },
      },
    });

    healthcareProviders.forEach((healthcareProvider) => {
      if (healthcareProvider.healthCareCenter) {
        healthcarecenterList.push(healthcareProvider.healthCareCenter);
      }
    });

    return healthcarecenterList;
  } catch (error) {
    console.error("Error fetching healthcare centers", error);
    return [];
  }
}
