import React from "react";

import Image from "next/image";
import { getAllConversationsForHP } from "@/actions/conversation";

import { ChatSidebar } from "@/components/base/chat/hp/chat-sidebar";
import { Sidebar } from "@/components/base/navigation/sidebar";

export default async function MessagesPage() {
  const conversations = await getAllConversationsForHP();
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr]">
      <Sidebar />
      <ChatSidebar conversations={conversations} />
      <div className="col-start-3 flex h-screen w-full flex-col items-center justify-center bg-muted/40">
        <div className="flex flex-col items-center space-y-6">
          <Image src="/messages.svg" width="150" height="150" alt="Messages" />
          <div className="flex flex-col items-center space-y-1">
            <p className="text-center text-xl font-bold tracking-tight text-slate-600">
              Select a conversation to start chatting
            </p>
            <span className="text-sm text-muted-foreground">
              You can view all your conversations here.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
