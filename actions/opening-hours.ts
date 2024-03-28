"use server";

import { revalidatePath } from "next/cache";
import {
  ManageOpeningHoursSchema,
  ManageOpeningHoursSchemaType,
} from "@/schemas";

import { db } from "@/lib/db";

import { getCurrentSession } from "./auth";

export async function getOpeningHoursByProviderId(providerId: string) {
  try {
    const openingHours = await db.openingHours.findMany({
      where: {
        healthCareProviderId: providerId,
      },
    });

    return openingHours;
  } catch (error) {
    console.error("[500] getOpeningHoursByProviderId", error);
  }
}

export async function createOpeningHours(values: ManageOpeningHoursSchemaType) {
  try {
    const user = await getCurrentSession();

    const healthCareProvider = await db.healthCareProvider.findFirst({
      where: {
        user: {
          id: user?.id,
        },
      },
    });

    const validatedFields = ManageOpeningHoursSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }

    const openingHours = values.openingHours.map((openingHour) => {
      return {
        ...openingHour,
        healthCareProviderId: healthCareProvider?.id as string,
      };
    });

    await db.openingHours.createMany({
      data: openingHours,
    });

    revalidatePath("/hp/dashboard/settings/opening-hours");

    return { success: "Opening hours created successfully." };
  } catch (error) {
    console.error("[500] createOpeningHours", error);
  }
}

export async function updateOpeningHours(values: ManageOpeningHoursSchemaType) {
  try {
    const user = await getCurrentSession();

    const healthCareProvider = await db.healthCareProvider.findFirst({
      where: {
        user: {
          id: user?.id,
        },
      },
    });

    const validatedFields = ManageOpeningHoursSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }

    const openingHours = values.openingHours.map((openingHour) => {
      return {
        ...openingHour,
        healthCareProviderId: healthCareProvider?.id as string,
      };
    });

    await db.openingHours.deleteMany({
      where: {
        healthCareProviderId: healthCareProvider?.id,
      },
    });

    await db.openingHours.createMany({
      data: openingHours,
    });

    revalidatePath("/hp/dashboard/settings/opening-hours");

    return { success: "Opening hours updated successfully." };
  } catch (error) {
    console.error("[500] updateOpeningHours", error);
  }
}
