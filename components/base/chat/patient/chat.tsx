import React from "react";

import { getCurrentSession } from "@/actions/auth";
import { getConversationById } from "@/actions/conversation";
import { User } from "@prisma/client";

import { ChatBottomBar } from "@/components/base/chat/chat-bottom-bar";
import { ChatTopbar } from "@/components/base/chat/chat-top-bar";

import { ChatBody } from "../chat-body";

interface ChatProps {
  conversationId: string;
}

export async function Chat({ conversationId }: ChatProps) {
  const conversation = await getConversationById(conversationId);
  const currentUser = await getCurrentSession();

  if ("error" in conversation!) {
    // Handle the error here
    return <div>Error: {conversation.error}</div>;
  }

  return (
    <div className="col-start-3 flex h-screen w-full flex-col justify-between bg-muted/40">
      <ChatTopbar
        selectedUser={conversation?.healthCareProvider.user as User}
      />
      <ChatBody
        conversation={conversation}
        currentUser={currentUser}
        initialMessages={conversation?.messages || []}
      />
      <ChatBottomBar
        conversationId={conversationId}
        senderId={currentUser?.id}
      />
    </div>
  );
}
