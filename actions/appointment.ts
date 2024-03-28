"use server";

import { revalidatePath } from "next/cache";
import {
  CreateAppointmentSchema,
  CreateAppointmentSchemaType,
  EditAppointmentSchema,
  EditAppointmentSchemaType,
} from "@/schemas";
import { AppointmentStatus } from "@prisma/client";

import { db } from "@/lib/db";

import { getCurrentSession } from "./auth";

export async function getAllAppointments() {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: {
        date: "asc",
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error(error);
  }
}

export async function getAppointmentById(id: string | undefined) {
  try {
    const appointment = await db.appointment.findFirst({
      where: {
        id,
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    return appointment;
  } catch (error) {
    console.error(error);
  }
}

export async function createAppointment(values: CreateAppointmentSchemaType) {
  try {
    const user = await getCurrentSession();

    const healthCareProvider = await db.healthCareProvider.findFirst({
      where: {
        user: {
          id: user?.id,
        },
      },
    });

    const validatedFields = CreateAppointmentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { title, description, day, startTime, endTime, status, patientId } =
      validatedFields.data;

    await db.appointment.create({
      data: {
        title,
        description,
        date: day,
        startTime,
        endTime,
        status,
        healthCareProvider: {
          connect: {
            id: healthCareProvider?.id,
          },
        },
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
    });

    revalidatePath("/calendar");

    return { success: "Appointment created successfully." };
  } catch (error) {
    console.error(error);
  }
}

export async function editAppointment(
  id: string | undefined,
  values: EditAppointmentSchemaType,
) {
  try {
    const validatedFields = EditAppointmentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { title, description, day, startTime, endTime, status } =
      validatedFields.data;

    await db.appointment.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date: day,
        startTime,
        endTime,
        status,
      },
    });

    revalidatePath("/calendar");

    return { success: "Appointment updated successfully." };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllAppointmentsByDate(date: Date) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        date,
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error(error);
  }
}

export async function cancelAppointment(id: string | undefined) {
  try {
    await db.appointment.update({
      where: {
        id,
      },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    revalidatePath("/calendar");

    return { success: "Appointment canceled successfully." };
  } catch (error) {
    console.error(error);
  }
}

export async function cancelAllAppointments(ids: (string | undefined)[]) {
  try {
    for (const id of ids || []) {
      await db.appointment.update({
        where: {
          id,
        },
        data: {
          status: AppointmentStatus.CANCELLED,
        },
      });
    }

    revalidatePath("/calendar");

    return { success: "Appointments canceled successfully." };
  } catch (error) {
    console.error(error);
  }
}
