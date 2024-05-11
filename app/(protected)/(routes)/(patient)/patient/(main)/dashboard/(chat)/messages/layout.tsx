import React from "react";

import { getAllConversationsForPatient } from "@/actions/conversation";

import { ChatSidebar } from "@/components/base/chat/patient/chat-sidebar";

interface PatientMessagesPageLayoutProps {
  children: React.ReactNode;
}

export default async function PatientMessagesPageLayout({
  children,
}: PatientMessagesPageLayoutProps) {
  const conversations = await getAllConversationsForPatient();
  return (
    <div className="grid h-screen grid-cols-[352px_1fr]">
      <ChatSidebar conversations={conversations} />
      {children}
    </div>
  );
}
