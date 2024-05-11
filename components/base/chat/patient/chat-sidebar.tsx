import React from "react";

import Link from "next/link";
import { getAllConversationsForPatient } from "@/actions/conversation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatSidebarItem } from "@/components/base/chat/patient/chat-sidebar-item";

interface ChatSidebarProps {
  conversations: Awaited<ReturnType<typeof getAllConversationsForPatient>>;
}

export function ChatSidebar({ conversations }: ChatSidebarProps) {
  return (
    <div className="row-start-1 row-end-3 flex flex-col overflow-hidden border-r bg-white">
      <div className="flex h-16 items-center justify-between border-b p-4">
        <h1 className="text-lg font-semibold">Messages</h1>
        <Button variant="outline" size="icon" asChild>
          <Link href="/patient/dashboard">
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
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
