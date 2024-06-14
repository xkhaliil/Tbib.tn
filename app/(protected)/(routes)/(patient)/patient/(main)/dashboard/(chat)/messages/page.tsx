import React from "react";

import Image from "next/image";
import { getCurrentSession, getPatientByUserId } from "@/actions/auth";
import { getPatientNotifications } from "@/actions/notifications";

import { Navbar } from "@/components/base/patient/navbar";

export default async function PatientMessagesPage() {
  const authenticatedUser = await getCurrentSession();
  const patient = await getPatientByUserId(authenticatedUser?.id);
  const notifications = await getPatientNotifications(patient?.id);
  return (
    <div className="col-start-2 grid h-screen w-full grid-rows-[64px_1fr] bg-muted/40">
      <Navbar patientId={patient?.id} notifications={notifications} />
      <div className="flex flex-col items-center justify-center space-y-6">
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
