import React from "react";

import Link from "next/link";
import { getConsultationById } from "@/actions/consultation";
import { getPatientById, getPatientRecord } from "@/actions/patient";
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
import { ConsultationDetails } from "@/components/base/consultation/consultation-details";
import { PatientRecordSidebar } from "@/components/base/consultation/patient-record-sidebar";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface ExistingConsultationPageProps {
  params: {
    consultationId: string;
  };
}

export default async function ExistingConsultationPage({
  params,
}: ExistingConsultationPageProps) {
  const consultation = await getConsultationById(params.consultationId);
  const patient = await getPatientById(consultation?.patientId);
  const record = await getPatientRecord(
    consultation?.patientId,
    consultation?.healthCareProviderId,
  );
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
              <BreadcrumbItem>Consultation Details</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Consultation with {patient?.user?.name} on{" "}
                  {format(
                    new Date(consultation?.date || new Date()),
                    "EEEE, do MMMM yyyy",
                  )}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button variant="outline" size="sm" asChild>
            <Link href="/hp/dashboard">
              <ChevronLeftIcon className="mr-1 h-4 w-4" />
              Go back
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <ConsultationDetails consultation={consultation} record={record} />
        </div>
      </ScrollArea>
    </div>
  );
}
