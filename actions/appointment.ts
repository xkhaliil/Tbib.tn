"use server";

import { revalidatePath } from "next/cache";
import {
  CreateAppointmentSchema,
  CreateAppointmentSchemaType,
  EditAppointmentSchema,
  EditAppointmentSchemaType,
} from "@/schemas";
import { AppointmentStatus, NotificationType } from "@prisma/client";
import { addHours, format, setDay, startOfToday } from "date-fns";

import { db } from "@/lib/db";
import {
  sendCancelledAppointmentToPatientEmail,
  sendCancelledAppointmentToPatientsEmails,
} from "@/lib/mail";
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

export async function cancelAppointment(id: string | undefined) {
  try {
    const existingAppointment = await getAppointmentById(id);

    const patient = await getPatientById(existingAppointment?.patientId);

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
        title: `Appointment Cancelled`,
        description: `Your appointment with Dr. ${healthcareProvider?.user?.name} on ${format(
          existingAppointment?.date || new Date(),
          "EEEE, MMMM do, yyyy",
        )} has been cancelled.`,
        type: NotificationType.APPOINTMENT_CANCELLED,
        date: new Date(),
        userId: patient?.user.id || "",
      },
    });

    await pusherServer.trigger(
      `notifications-patient-${patient?.id}`,
      "new-notification",
      notification,
    );

    if (patient?.user.receiveEmailNotifications) {
      await sendCancelledAppointmentToPatientEmail(
        patient,
        healthcareProvider,
        existingAppointment,
      );
    }

    revalidatePath("/calendar");

    return { success: "Appointment cancelled successfully." };
  } catch (error) {
    console.error(error);
  }
}

export async function cancelAllAppointments(ids: (string | undefined)[]) {
  try {
    const validIds: string[] = ids.filter(
      (id): id is string => id !== undefined,
    );

    const existingAppointments = await db.appointment.findMany({
      where: {
        id: { in: validIds },
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    await db.appointment.updateMany({
      where: {
        id: { in: validIds },
      },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    if (existingAppointments.length === 0) {
      return { error: "No appointments found to cancel." };
    }

    const healthcareProvider = await db.healthCareProvider.findFirst({
      where: {
        id: existingAppointments[0]?.healthCareProviderId,
      },
      include: {
        user: true,
      },
    });

    const notificationsData = existingAppointments.map((appointment) => ({
      title: `Appointment Cancelled`,
      description: `Your appointment with Dr. ${healthcareProvider?.user?.name} on ${format(
        appointment.date || new Date(),
        "EEEE, MMMM do, yyyy",
      )} has been cancelled.`,
      type: NotificationType.APPOINTMENT_CANCELLED,
      date: new Date(),
      userId: appointment.patient?.userId || "",
    }));

    await db.notification.createMany({
      data: notificationsData,
    });

    const patients = existingAppointments.map(
      (appointment) => appointment.patient,
    );

    for (const patient of patients) {
      await pusherServer.trigger(
        `notifications-patient-${patient.id}`,
        "new-notification",
        {
          title: "Appointment Cancelled",
          description: `Your appointment with Dr. ${healthcareProvider?.user?.name} on ${format(
            existingAppointments[0].date || new Date(),
            "EEEE, MMMM do, yyyy",
          )} has been cancelled.`,
        },
      );

      if (patient.user.receiveEmailNotifications) {
        await sendCancelledAppointmentToPatientsEmails(
          [patient],
          healthcareProvider,
          existingAppointments,
        );
      }
    }

    revalidatePath("/calendar");

    return { success: "Appointments canceled successfully." };
  } catch (error) {
    console.error("Error canceling appointments:", error);
    return { error: "An error occurred while canceling appointments." };
  }
}

export async function fetchTodayAppointments(
  healthCareCenterId: string | undefined,
) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        date: addHours(startOfToday(), 1),
        status: {
          notIn: [AppointmentStatus.EXPIRED],
        },
        healthCareProvider: {
          healthCareCenterId: healthCareCenterId,
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

export async function fetchWeeklyAppointments(
  healthCareCenterId: string | undefined,
) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        date: {
          gte: setDay(startOfToday(), 0),
          lte: setDay(startOfToday(), 6),
        },
        healthCareProvider: {
          healthCareCenterId,
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

export async function fetchMonthlyAppointments(
  healthCareCenterId: string | undefined,
) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        date: {
          gte: addHours(startOfToday(), 1),
          lte: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        },
        healthCareProvider: {
          healthCareCenterId,
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
