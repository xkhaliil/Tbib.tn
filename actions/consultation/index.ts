"use server";

import {
  CreateConsultationSchema,
  CreateConsultationSchemaType,
} from "@/schemas";
import {
  AppointmentStatus,
  Medication,
  PrescriptionType,
} from "@prisma/client";
import { startOfToday } from "date-fns";

import { db } from "@/lib/db";

import { getCurrentSession, getHealthcareProviderByUserId } from "../auth";

export async function startConsultation(patientId: string | undefined) {
  try {
    const currentUser = await getCurrentSession();

    const healthcareProvider = await getHealthcareProviderByUserId(
      currentUser?.id,
    );

    const existingRecord = await db.record.findFirst({
      where: {
        patientId: patientId as string,
        healthCareProviderId: healthcareProvider?.id,
      },
    });

    if (existingRecord) {
      return;
    }

    const newRecord = await db.record.create({
      data: {
        patientId: patientId as string,
        healthCareProviderId: healthcareProvider?.id,
      },
    });

    return newRecord;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllConsultations(
  healthcareProviderId: string | undefined,
) {
  try {
    const consultations = await db.consultation.findMany({
      where: {
        healthCareProviderId: healthcareProviderId,
      },
    });

    return consultations;
  } catch (error) {
    console.error(error);
  }
}

export async function saveConsultation(
  patientId: string | undefined,
  appointmentId: string | undefined,
  recordId: string | undefined,
  values: CreateConsultationSchemaType,
) {
  try {
    const currentUser = await getCurrentSession();
    const healthcareProvider = await getHealthcareProviderByUserId(
      currentUser?.id,
    );

    const validatedFields = CreateConsultationSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { diagnosis, followUp, notes, prescription } = values;

    const newConsultation = await db.consultation.create({
      data: {
        patientId: patientId as string,
        healthCareProviderId: healthcareProvider?.id as string,
        appointmentId: appointmentId as string,
        diagnosis,
        followUp,
        notes,
        date: startOfToday(),
      },
    });

    let createdMedications: Medication[] = [];

    if (prescription?.medications) {
      createdMedications = await Promise.all(
        prescription.medications.map(async (med) => {
          return await db.medication.create({
            data: {
              name: med.name,
              dosage: med.dosage,
              duration: med.duration,
            },
          });
        }),
      );
    }

    const newPrescription = await db.prescription.create({
      data: {
        date: prescription?.date,
        type: prescription?.type as PrescriptionType,
        medications: {
          connect: createdMedications.map((med) => ({ id: med.id })),
        },
        biologyTestType: prescription?.biologyTestType,
        biologyTestReason: prescription?.biologyTestReason,
        biologyTestNotes: prescription?.biologyTestNotes,
        imagingStudyNotes: prescription?.imagingStudyNotes,
        imagingStudyReason: prescription?.imagingStudyReason,
        imagingStudyType: prescription?.imagingStudyType,
        medicalCertificateType: prescription?.medicalCertificateType,
        medicalCertificatePurpose: prescription?.medicalCertificatePurpose,
        medicalCertificateStartDate: prescription?.medicalCertificateStartDate,
        medicalCertificateEndDate: prescription?.medicalCertificateEndDate,
        medicalCertificateNotes: prescription?.medicalCertificateNotes,
        paramedicalActType: prescription?.paramedicalActType,
        paramedicalActReason: prescription?.paramedicalActReason,
        paramedicalActDuration: prescription?.paramedicalActDuration,
        paramedicalActNotes: prescription?.paramedicalActNotes,
        healthCareProviderId: healthcareProvider?.id as string,
        patientId: patientId as string,
        consultationId: newConsultation.id,
      },
    });

    await db.consultation.update({
      where: { id: newConsultation.id },
      data: {
        prescriptions: {
          connect: { id: newPrescription.id },
        },
      },
    });

    if (createdMedications.length > 0) {
      await db.record.update({
        where: {
          id: recordId,
        },
        data: {
          currentMedications: {
            connect: createdMedications.map((med) => ({ id: med.id })),
          },
        },
      });
    }

    await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: AppointmentStatus.COMPLETED,
      },
    });

    const existingConversation = await db.conversation.findFirst({
      where: {
        patientId: patientId,
        healthCareProviderId: healthcareProvider?.id,
      },
    });

    if (!existingConversation) {
      await db.conversation.create({
        data: {
          patientId: patientId as string,
          healthCareProviderId: healthcareProvider?.id as string,
        },
      });
    }

    return { success: "Consultation saved successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while saving the consultation" };
  }
}

export async function getConsultationById(consultationId: string) {
  try {
    const consultation = await db.consultation.findUnique({
      where: {
        id: consultationId,
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
        prescriptions: {
          include: {
            medications: true,
          },
        },
      },
    });

    return consultation;
  } catch (error) {
    console.error(error);
  }
}
