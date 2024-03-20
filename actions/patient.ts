"use server";

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

export async function getPatientById(id: string) {
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
