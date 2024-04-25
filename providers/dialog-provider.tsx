import React from "react";

import { getAllAbsences } from "@/actions/absence";
import { getCurrentSession, getPatientByUserId } from "@/actions/auth";
import { getAllPatients } from "@/actions/patient";
import { SessionProvider } from "next-auth/react";

import { ManageAccountDialog } from "@/components/auth/dialogs/manage-account-dialog";
import { InviteHealthcareProviderDialog } from "@/components/base/healthcare-center/dashboard/dialogs/invite-healthcare-provider-dialog";
import { UploadDocumentDialog } from "@/components/base/patient/medical-documents/dialogs/upload-document-dialog";
import { CreateAppointmentDialog } from "@/components/dialogs/create-appointment-dialog";
import { SignInDialog } from "@/components/dialogs/sign-in-dialog";

export async function DialogProvider() {
  const currentUser = await getCurrentSession();
  const currentPatient = await getPatientByUserId(currentUser?.id);
  const absences = await getAllAbsences();
  const patients = await getAllPatients();
  return (
    <>
      <SessionProvider>
        <ManageAccountDialog />
        <CreateAppointmentDialog absences={absences} patients={patients} />
        <InviteHealthcareProviderDialog />
        <UploadDocumentDialog patientId={currentPatient?.id} />
        <SignInDialog />
      </SessionProvider>
    </>
  );
}
