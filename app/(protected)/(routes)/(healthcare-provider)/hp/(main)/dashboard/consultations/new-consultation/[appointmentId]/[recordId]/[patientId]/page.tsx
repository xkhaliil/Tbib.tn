import React from "react";

import Link from "next/link";
import { getAppointmentById } from "@/actions/appointment";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import { getPatientById, getPatientRecord } from "@/actions/patient";
import { format } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateConsultationForm } from "@/components/base/consultation/forms/create-consultation-form";
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
  const appointment = await getAppointmentById(params.appointmentId);
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar />
      <Sidebar />
      <PatientRecordSidebar patient={patient} record={record} />
      <ScrollArea className="col-start-3 bg-secondary p-8">
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
                {format(
                  new Date(appointment?.date || new Date()),
                  "dd/MM/yyyy",
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
