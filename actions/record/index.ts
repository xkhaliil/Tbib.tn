"use server";

import { revalidatePath } from "next/cache";
import {
  ManageFollowUpDataSchema,
  ManageFollowUpDataSchemaType,
  ManagePatientBackgroundSchema,
  ManagePatientBackgroundSchemaType,
} from "@/schemas";

import { db } from "@/lib/db";

import { getCurrentSession, getHealthcareProviderByUserId } from "../auth";
import { getPatientRecord } from "../patient";

export async function manageBackgroundInfo(
  patientId: string | undefined,
  appointmentId: string,
  values: ManagePatientBackgroundSchemaType,
) {
  try {
    const validatedFields = ManagePatientBackgroundSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const {
      allergies,
      chronicDiseases,
      vaccinations,
      surgeries,
      familyHistory,
      bloodType,
      smoker,
      alcohol,
      occupation,
    } = validatedFields.data;

    const currentUser = await getCurrentSession();

    const healthcareProvider = await getHealthcareProviderByUserId(
      currentUser?.id,
    );

    const existingRecord = await getPatientRecord(
      patientId,
      healthcareProvider?.id,
    );

    await db.record.update({
      where: { id: existingRecord?.id },
      data: {
        allergies,
        chronicDiseases,
        vaccinations,
        surgeries,
        familyHistory,
        bloodType,
        smoker,
        alcohol,
        occupation,
      },
    });

    revalidatePath(`/hp/dashboard/consultations/${appointmentId}/${patientId}`);

    return { success: "Background info updated!" };
  } catch (error) {
    console.error(error);
  }
}

export async function manageFollowUpInfo(
  patientId: string | undefined,
  appointmentId: string,
  values: ManageFollowUpDataSchemaType,
) {
  try {
    const validatedFields = ManageFollowUpDataSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { weight, height, bmi, bloodPressure } = validatedFields.data;

    const currentUser = await getCurrentSession();

    const healthcareProvider = await getHealthcareProviderByUserId(
      currentUser?.id,
    );

    const existingRecord = await getPatientRecord(
      patientId,
      healthcareProvider?.id,
    );

    await db.record.update({
      where: { id: existingRecord?.id },
      data: {
        weight: weight,
        height: height,
        bloodPressure: bloodPressure,
        bmi: bmi,
      },
    });

    revalidatePath(`/hp/dashboard/consultations/${appointmentId}/${patientId}`);

    return { success: "Follow-up info updated!" };
  } catch (error) {
    console.error(error);
  }
}
