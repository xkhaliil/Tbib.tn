"use server";

import { revalidatePath } from "next/cache";
import { CreateAbsenceSchema, CreateAbsenceSchemaType } from "@/schemas";
import { AppointmentStatus } from "@prisma/client";
import { addHours } from "date-fns";

import { db } from "@/lib/db";

import { getAllAppointmentsByDate } from "./appointment";
import { getCurrentSession } from "./auth";

export async function getAllAbsences(healthCareProviderId?: string) {
  try {
    const absences = await db.absence.findMany({
      where: {
        healthCareProviderId,
      },
    });

    return absences;
  } catch (error) {
    console.error(error);
  }
}

export async function createAbsence(values: CreateAbsenceSchemaType) {
  try {
    const user = await getCurrentSession();

    const healthCareProvider = await db.healthCareProvider.findFirst({
      where: {
        userId: user?.id,
      },
    });

    const parsedDate = addHours(values.date, 1);

    const appointments = await getAllAppointmentsByDate(parsedDate);

    if (appointments) {
      if (appointments.length > 0) {
        for (const appointment of appointments) {
          if (
            appointment.status === AppointmentStatus.PENDING ||
            appointment.status === AppointmentStatus.UPCOMING
          ) {
            return {
              exists: true,
              appointments,
            };
          } else {
            continue;
          }
        }
      }
    }

    const validatedFields = CreateAbsenceSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    await db.absence.create({
      data: {
        date: parsedDate,
        healthCareProvider: {
          connect: {
            id: healthCareProvider?.id,
          },
        },
      },
    });

    revalidatePath("/calendar");

    return { success: "Absence created successfully." };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAbsence(date: Date) {
  try {
    const parsedDate = addHours(date, 1);

    await db.absence.delete({
      where: {
        date: parsedDate,
      },
    });

    revalidatePath("/calendar");

    return { success: "Absence deleted successfully." };
  } catch (error) {
    console.error(error);
  }
}
