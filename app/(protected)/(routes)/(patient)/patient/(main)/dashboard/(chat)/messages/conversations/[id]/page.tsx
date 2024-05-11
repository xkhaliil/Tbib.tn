import React from "react";

import { Chat } from "@/components/base/chat/patient/chat";

interface PatientConversationPageProps {
  params: {
    id: string;
  };
}

export default function PatientConversationPage({
  params,
}: PatientConversationPageProps) {
  return (
    <div className="col-start-2">
      <Chat conversationId={params.id} />
    </div>
  );
}
