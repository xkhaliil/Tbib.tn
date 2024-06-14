"use server";

import {
  getCurrentSession,
  getHealthcareProviderByUserId,
  getPatientByUserId,
} from "@/actions/auth";

import { db } from "@/lib/db";

export async function getAllConversationsForHP() {
  try {
    const currentUser = await getCurrentSession();

    if (!currentUser) {
      return { error: "No user found" };
    }

    const healthcareProvider = await getHealthcareProviderByUserId(
      currentUser?.id,
    );

    if (!healthcareProvider) {
      return { error: "No healthcare provider found" };
    }

    const conversations = await db.conversation.findMany({
      where: {
        healthCareProviderId: healthcareProvider?.id,
      },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!conversations) {
      return { error: "No conversations found" };
    }

    return conversations;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllConversationsForPatient() {
  try {
    const currentUser = await getCurrentSession();

    const patient = await getPatientByUserId(currentUser?.id);

    const conversation = await db.conversation.findMany({
      where: {
        patientId: patient?.id,
      },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
        healthCareProvider: {
          include: {
            user: true,
          },
        },
      },
    });

    return conversation;
  } catch (error) {
    console.error(error);
  }
}

export async function getConversationById(conversationId: string) {
  try {
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
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

    return conversation;
  } catch (error) {
    console.error(error);
  }
}
