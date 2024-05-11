"use server";

import { revalidatePath } from "next/cache";
import { SendNewMessageSchemaType } from "@/schemas";
import { Message, User } from "@prisma/client";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

import { getCurrentSession } from "../auth";

export async function sendNewMessage(
  values: SendNewMessageSchemaType,
  fileName: string | undefined,
  fileType: string | undefined,
  conversationId: string,
  senderId: string,
) {
  try {
    const { content, file } = values;

    const newMessage = await db.message.create({
      data: {
        content,
        file,
        fileType,
        fileName,
        conversationId,
        senderId,
      },
      include: {
        sender: true,
        seenBy: true,
      },
    });

    await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
      },
    });

    await pusherServer.trigger(
      `conversation-${conversationId}`,
      "messages:new",
      newMessage,
    );

    revalidatePath(`/hp/dashboard/messages/conversations/${conversationId}`);

    return newMessage;
  } catch (error) {
    console.error(error);
  }
}

export async function getMessagesByConversationId(conversationId: string) {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
      },
    });

    return messages;
  } catch (error) {
    console.error(error);
  }
}

export async function markMessageAsSeen(conversationId: string | undefined) {
  try {
    const currentUser = await getCurrentSession();

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seenBy: true,
          },
        },
        patient: true,
        healthCareProvider: true,
      },
    });

    if (!conversation) {
      return {
        error: "Conversation not found",
      };
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seenBy: true,
        sender: true,
      },
      data: {
        seenBy: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    });

    revalidatePath(`/hp/dashboard/messages/conversations/${conversationId}`);

    return updatedMessage;
  } catch (error) {
    console.error(error);
  }
}

export async function isMessageSeenByCurrentUser(message: Message) {
  try {
    const currentUser = await getCurrentSession();

    const messageWithSeenBy = await db.message.findUnique({
      where: {
        id: message.id,
      },
      include: {
        seenBy: true,
      },
    });

    if (messageWithSeenBy?.seenBy.find((user) => user.id === currentUser?.id)) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
  }
}
