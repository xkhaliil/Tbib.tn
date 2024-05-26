"use server";

import { revalidatePath } from "next/cache";
import {
  CreateAppointmentSchema,
  CreateAppointmentSchemaType,
  EditAppointmentSchema,
  EditAppointmentSchemaType,
} from "@/schemas";
import { AppointmentStatus, NotificationType } from "@prisma/client";
import { addHours, setDay, startOfToday } from "date-fns";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

import { getCurrentSession } from "./auth";
import { getPatientById } from "./patient";

export async function getAllAppointments(healthCareProviderId?: string) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        healthCareProviderId,
      },
      orderBy: {
        startTime: "asc",
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        healthCareProvider: {
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

export async function getAllTodayAppointments(healthCareProviderId?: string) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        healthCareProviderId,
        startTime: {
          gte: new Date(),
        },
        status: {
          in: [AppointmentStatus.PENDING, AppointmentStatus.UPCOMING],
        },
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        healthCareProvider: {
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

export async function getPastAppointments(healthCareProviderId?: string) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        healthCareProviderId,
        status: {
          in: [AppointmentStatus.COMPLETED],
        },
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        healthCareProvider: {
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

export async function cancelAppointment(
  id: string | undefined,
  patientId: string | undefined,
) {
  try {
    const existingAppointment = await getAppointmentById(id);

    const patient = await getPatientById(patientId);

    const healthcareProvider = await db.healthCareProvider.findFirst({
      where: {
        id: existingAppointment?.healthCareProviderId,
      },
      include: {
        user: true,
      },
    });

    await db.appointment.update({
      where: {
        id,
      },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    const notification = await db.notification.create({
      data: {
        title: "Appointment Cancelled",
        description: `Your appointment with ${healthcareProvider?.user.name} on ${existingAppointment?.date} has been canceled.`,
        type: NotificationType.APPOINTMENT_CANCELLED,
        date: new Date(),
        userId: patient?.user.id || "",
      },
    });

    await pusherServer.trigger(
      `patient-notifications-${patientId}`,
      "notifications:new",
      notification,
    );

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

export async function fetchTodayAppointments() {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        date: addHours(startOfToday(), 1),
        status: {
          notIn: [AppointmentStatus.EXPIRED],
        },
      },
      include: {
        healthCareProvider: {
          include: {
            user: true,
          },
        },
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

export async function fetchWeeklyAppointments() {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        healthCareProvider: {
          include: {
            user: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },

      where: {
        date: {
          gte: addHours(startOfToday(), 1),
          lte: setDay(startOfToday(), 6),
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMonthlyAppointments() {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        healthCareProvider: {
          include: {
            user: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },

      where: {
        date: {
          gte: addHours(startOfToday(), 1),
          lte: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error(error);
  }
}
