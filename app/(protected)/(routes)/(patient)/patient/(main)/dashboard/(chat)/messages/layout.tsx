import React from "react";

import { requireAuth } from "@/actions/auth";
import { getAllConversationsForPatient } from "@/actions/conversation";
import { Role } from "@prisma/client";

import { Unauthorized } from "@/components/auth/unauthorized";
import { ChatSidebar } from "@/components/base/chat/patient/chat-sidebar";

interface PatientMessagesPageLayoutProps {
  children: React.ReactNode;
}

export default async function PatientMessagesPageLayout({
  children,
}: PatientMessagesPageLayoutProps) {
  const conversations = await getAllConversationsForPatient();

  const { authorized } = await requireAuth(Role.PATIENT);

  if (!authorized) return <Unauthorized />;

  return (
    <div className="grid h-screen grid-cols-[352px_1fr]">
      <ChatSidebar conversations={conversations} />
      {children}
    </div>
  );
}
