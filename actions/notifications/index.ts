"use server";

import { db } from "@/lib/db";

import { getUserByHealthcareProviderId } from "../auth";
import { getPatientById } from "../patient";

export async function getHealthcareProviderNotifications(
  healthcareProviderId: string | undefined,
) {
  try {
    const healthcareProvider =
      await getUserByHealthcareProviderId(healthcareProviderId);

    const notifications = await db.notification.findMany({
      where: {
        userId: healthcareProvider?.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error(error);
  }
}

export async function getPatientNotifications(patientId: string | undefined) {
  try {
    const patient = await getPatientById(patientId);

    const notifications = await db.notification.findMany({
      where: {
        userId: patient?.user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error(error);
  }
}

export async function archiveNotification(notificationId: string) {
  try {
    const notification = await db.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        archived: true,
        read: true,
      },
    });

    return notification;
  } catch (error) {
    console.error(error);
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const notification = await db.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });

    return notification;
  } catch (error) {
    console.error(error);
  }
}

export async function markAllNotificationsAsRead(userId: string | undefined) {
  try {
    await db.notification.updateMany({
      where: {
        userId,
      },
      data: {
        read: true,
      },
    });

    const updatedNotifications = await db.notification.findMany({
      where: {
        userId,
        read: true,
      },
    });

    return updatedNotifications;
  } catch (error) {
    console.error(error);
  }
}

export async function getNotificationById(notificationId: string) {
  try {
    const notification = await db.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    return notification;
  } catch (error) {
    console.error(error);
  }
}
