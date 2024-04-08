"use server";

import { revalidatePath } from "next/cache";
import { UploadDocumentSchemaType } from "@/schemas";
import { startOfToday } from "date-fns";

import { db } from "@/lib/db";

export async function getAllPatients() {
  try {
    const patients = await db.patient.findMany({
      include: {
        user: true,
        appointments: true,
      },
    });

    return patients;
  } catch (error) {
    console.error(error);
  }
}

export async function getPatientById(id: string | undefined) {
  try {
    const patient = await db.patient.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        appointments: true,
      },
    });

    return patient;
  } catch (error) {
    console.error(error);
  }
}

export async function getNewPatients() {
  try {
    const newPatients = await db.patient.findMany({
      where: {
        user: {
          createdAt: {
            gt: new Date(new Date().setDate(new Date().getDate() - 3)),
          },
        },
      },
      include: {
        user: true,
        appointments: true,
      },
    });

    return newPatients;
  } catch (error) {
    console.error(error);
  }
}

export async function getPatientsWithAtLeastOneAppointment() {
  try {
    const patientsWithAtLeastOneAppointment = await db.patient.findMany({
      where: {
        appointments: {
          some: {},
        },
      },
      include: {
        user: true,
        appointments: true,
      },
      take: 4,
    });

    return patientsWithAtLeastOneAppointment;
  } catch (error) {
    console.error(error);
  }
}

export async function getPatientsCount() {
  try {
    const patientsCount = await db.patient.count();

    return patientsCount;
  } catch (error) {
    console.error(error);
  }
}
export async function getPatientsByMonth() {
  const users = await db.user.findMany({
    select: {
      createdAt: true,
    },
    where: {
      role: "PATIENT",
    },
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const PatientsPerMonth = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames[index],
      totalUsers: users.filter((user) => {
        const date = new Date(user.createdAt);
        return date.getMonth() === index && date.getFullYear() === 2024;
      }).length,
    }));

  return PatientsPerMonth;
}

export async function getPatientPastAppointments(id: string | undefined) {
  try {
    const currentUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    const currentPatient = await db.patient.findUnique({
      where: {
        userId: currentUser?.id,
      },
    });

    const pastAppointments = await db.appointment.findMany({
      where: {
        patientId: currentPatient?.id,
        date: {
          lt: startOfToday(),
        },
      },
      include: {
        healthCareProvider: {
          include: {
            user: true,
          },
        },
      },
    });

    return pastAppointments;
  } catch (error) {
    console.error(error);
  }
}

export async function getPatientUpcomingAppointments(id: string | undefined) {
  try {
    const currentUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    const currentPatient = await db.patient.findUnique({
      where: {
        userId: currentUser?.id,
      },
    });

    const upcomingAppointments = await db.appointment.findMany({
      where: {
        patientId: currentPatient?.id,
        date: {
          gte: startOfToday(),
        },
      },
      include: {
        healthCareProvider: {
          include: {
            user: true,
          },
        },
      },
    });

    return upcomingAppointments;
  } catch (error) {
    console.error(error);
  }
}

export async function getPatientAppointments(id: string | undefined) {
  try {
    const currentUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    const currentPatient = await db.patient.findUnique({
      where: {
        userId: currentUser?.id,
      },
    });

    const appointments = await db.appointment.findMany({
      where: {
        patientId: currentPatient?.id,
        status: "COMPLETED",
      },
      include: {
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

export async function getPatientDocuments(patientId: string | undefined) {
  try {
    const patientDocuments = await db.document.findMany({
      where: {
        patientId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return patientDocuments;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadDocument(
  values: UploadDocumentSchemaType,
  patientId: string,
) {
  try {
    const { title: name, description, file: url } = values;

    const document = await db.document.create({
      data: {
        name,
        description,
        url,
        patientId,
      },
    });

    if (document) {
      revalidatePath("/patient/dashboard/medical-documents");
      return { success: "Document uploaded successfully" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDocument(id: string) {
  try {
    const document = await db.document.delete({
      where: {
        id,
      },
    });

    if (document) {
      revalidatePath("/patient/dashboard/medical-documents");
      return { success: "Document deleted successfully" };
    }
  } catch (error) {
    console.error(error);
  }
}
