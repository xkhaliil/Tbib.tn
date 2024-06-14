"use server";

import { revalidatePath } from "next/cache";
import {
  getCurrentSession,
  getPatientByUserId,
  getUserByHealthcareProviderId,
} from "@/actions/auth";
import { AddNewReviewSchema, AddNewReviewSchemaType } from "@/schemas";
import { NotificationType } from "@prisma/client";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

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

    const healthCareProviderUser =
      await getUserByHealthcareProviderId(healthCareProviderId);

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

    const notification = await db.notification.create({
      data: {
        title: "New review",
        description: `${patient?.user.name} left a review for you, check it out!`,
        type: NotificationType.REVIEW,
        date: new Date(),
        userId: healthCareProviderUser?.id || "",
      },
    });

    await pusherServer.trigger(
      `notifications-${healthCareProviderId}`,
      "notifications:new",
      notification,
    );

    revalidatePath(`/hp/profile/${healthCareProviderId}`);

    return review;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const review = await db.review.delete({
      where: {
        id: reviewId,
      },
    });

    revalidatePath(`/hp/profile/${review.healthCareProviderId}`);

    return review;
  } catch (error) {
    console.error(error);
  }
}
