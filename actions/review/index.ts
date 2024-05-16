"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession, getPatientByUserId } from "@/actions/auth";
import { AddNewReviewSchema, AddNewReviewSchemaType } from "@/schemas";

import { db } from "@/lib/db";

export async function addNewReview(
  healthCareProviderId: string,
  values: AddNewReviewSchemaType,
) {
  try {
    const validatedFields = AddNewReviewSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { comment, rating } = validatedFields.data;

    const currentUser = await getCurrentSession();

    const patient = await getPatientByUserId(currentUser?.id);

    const review = await db.review.create({
      data: {
        patientId: patient?.id || "",
        healthCareProviderId,
        comment,
        rating,
        date: new Date(),
      },
    });

    await revalidatePath(`/hp/profile/${healthCareProviderId}`);

    return review;
  } catch (error) {
    console.error(error);
  }
}
