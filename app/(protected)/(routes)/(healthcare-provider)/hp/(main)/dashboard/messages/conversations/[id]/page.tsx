import React from "react";

import { getAllConversationsForHP } from "@/actions/conversation";

import { Chat } from "@/components/base/chat/hp/chat";
import { ChatSidebar } from "@/components/base/chat/hp/chat-sidebar";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface ConversationPageProps {
  params: {
    id: string;
  };
}

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const conversations = await getAllConversationsForHP();
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr]">
      <Sidebar />
      <ChatSidebar conversations={conversations} />
      <Chat conversationId={params.id} />
    </div>
  );
}
