import React from "react";

import Link from "next/link";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import {
  getPatientById,
  getPatientConsultationsWithHealthcareProvider,
  getPatientDocuments,
  getPatientRecord,
} from "@/actions/patient";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateConsultationForm } from "@/components/base/consultation/forms/create-consultation-form";
import { PatientHistorySheet } from "@/components/base/consultation/patient-history-sheet";
import { PatientRecordSidebar } from "@/components/base/consultation/patient-record-sidebar";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface NewConsultationPageProps {
  params: {
    appointmentId: string;
    recordId: string;
    patientId: string;
  };
}

export default async function NewConsultationPage({
  params,
}: NewConsultationPageProps) {
  const authenticatedUser = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(
    authenticatedUser?.id,
  );
  const patient = await getPatientById(params.patientId);
  const record = await getPatientRecord(
    params.patientId,
    healthcareProvider?.id,
  );
  const patientConsultations =
    await getPatientConsultationsWithHealthcareProvider(
      params.patientId,
      healthcareProvider?.id,
    );
  const patientMedicalDocuments = await getPatientDocuments(params.patientId);
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar />
      <Sidebar />
      <PatientRecordSidebar patient={patient} record={record} />
      <ScrollArea className="col-start-3 bg-secondary p-8">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/hp/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Consultation with {patient?.user.name} at{" "}
                  {format(new Date(), "dd/MM/yyyy")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-2.5">
            <PatientHistorySheet
              consultations={patientConsultations}
              medicalDocuments={patientMedicalDocuments}
            />

            <Button variant="outline" size="icon" asChild>
              <Link href="/hp/dashboard">
                <ChevronLeftIcon className="h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <CreateConsultationForm
            record={record}
            appointmentId={params.appointmentId}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
