import React from "react";

import { getAllConversationsForHP } from "@/actions/conversation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatSidebarItem } from "@/components/base/chat/hp/chat-sidebar-item";

import { NewMessageDialog } from "../new-message-dialog";

interface ChatSidebarProps {
  conversations: Awaited<ReturnType<typeof getAllConversationsForHP>>;
}

export function ChatSidebar({ conversations }: ChatSidebarProps) {
  return (
    <div className="row-start-1 row-end-3 hidden flex-col overflow-hidden border-r bg-white lg:flex">
      <div className="flex h-16 items-center justify-between border-b p-4">
        <h1 className="text-lg font-semibold">Messages</h1>
        <NewMessageDialog conversations={conversations} />
      </div>

      <ScrollArea className="flex flex-col gap-4 p-4">
        {Array.isArray(conversations) &&
          conversations.map((conversation) => (
            <ChatSidebarItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
      </ScrollArea>
    </div>
  );
}
