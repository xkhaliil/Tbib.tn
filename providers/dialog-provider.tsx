import React from "react";

import { getAllAbsences } from "@/actions/absence";
import { getAllPatients } from "@/actions/patient";
import { SessionProvider } from "next-auth/react";

import { ManageAccountDialog } from "@/components/auth/dialogs/manage-account-dialog";
import { CreateAppointmentDialog } from "@/components/dialogs/create-appointment-dialog";

export async function DialogProvider() {
  const absences = await getAllAbsences();
  const patients = await getAllPatients();
  return (
    <>
      <SessionProvider>
        <ManageAccountDialog />
        <CreateAppointmentDialog absences={absences} patients={patients} />
      </SessionProvider>
    </>
  );
}
