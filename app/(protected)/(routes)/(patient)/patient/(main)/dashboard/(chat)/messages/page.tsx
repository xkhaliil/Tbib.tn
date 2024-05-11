import React from "react";

import Image from "next/image";

export default function PatientMessagesPage() {
  return (
    <div className="col-start-2 flex h-screen w-full flex-col items-center justify-center bg-muted/40">
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
  );
}
