import React from "react";

import Link from "next/link";
import { getPatientById } from "@/actions/patient";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BackgroundInfoForm } from "@/components/base/consultation/forms/background-info-form";
import { FollowUpInfoForm } from "@/components/base/consultation/forms/follow-up-info-form";
import { PatientRecordSidebar } from "@/components/base/consultation/patient-record-sidebar";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface ConsultationsPageProps {
  params: {
    appointmentId: string;
    patientId: string;
  };
}

export default async function ConsultationsPage({
  params,
}: ConsultationsPageProps) {
  const patient = await getPatientById(params.patientId);
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar />
      <Sidebar />
      <PatientRecordSidebar patient={patient} />
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
              <BreadcrumbPage>Patient Record</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Patient Background Information</CardTitle>
                <CardDescription>
                  This section contains the patient's background information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BackgroundInfoForm patient={patient} />
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>
                  This section contains the patient's current medications.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Follow Up Information</CardTitle>
                <CardDescription>
                  This section contains the patient's follow up information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FollowUpInfoForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
