import React from "react";

import Image from "next/image";
import Link from "next/link";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import {
  getPatientById,
  getPatientConsultationsWithHealthcareProvider,
} from "@/actions/patient";
import { ChevronLeftIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface PatientConsultationsPageProps {
  params: {
    patientId: string;
  };
}

export default async function PatientConsultationsPage({
  params,
}: PatientConsultationsPageProps) {
  const authenticatedUser = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(
    authenticatedUser?.id,
  );
  const patient = await getPatientById(params.patientId);
  const consultations = await getPatientConsultationsWithHealthcareProvider(
    params.patientId,
    healthcareProvider?.id,
  );
  return (
    <div className="grid h-screen grid-cols-[70px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar className="col-start-2" />
      <Sidebar />
      <ScrollArea className="col-start-2 bg-secondary p-8">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/hp/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Consultations</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Consultations with{" "}
                  {patient?.user?.gender === "MALE" ? "Mr." : "Ms."}{" "}
                  {patient?.user?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button variant="outline" size="sm" asChild>
            <Link href="/hp/dashboard/patients">
              <ChevronLeftIcon className="mr-1 h-4 w-4" />
              Go back
            </Link>
          </Button>
        </div>
        {consultations?.length === 0 ? (
          <div className="mt-64 flex w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/empty-folder.svg"
                alt="Empty Folder"
                width={200}
                height={200}
                className="mb-4"
              />
              <h1 className="text-xl font-semibold tracking-tight">
                No consultations found.
              </h1>
              <p className="text-sm text-muted-foreground">
                This patient has not had any consultations with you.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {consultations?.map((consultation) => (
                <Card key={consultation.id}>
                  <div className="flex items-center justify-between border-b bg-muted/40 p-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Consultation on{" "}
                      {format(
                        new Date(consultation.createdAt),
                        "dd/MM/yyyy 'at' hh:mm a",
                      )}
                    </CardTitle>

                    <Button variant="blue" size="sm" asChild>
                      <Link
                        href={`/hp/dashboard/consultations/existing-consultation/${consultation.id}`}
                      >
                        <EyeOpenIcon className="mr-2 h-4 w-4" />
                        More Details
                      </Link>
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {consultation.diagnosis || "No diagnosis provided."}
                    </p>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Badge variant="white">
                        {consultation.prescriptions?.length || 0}{" "}
                        prescription(s) provided.
                      </Badge>
                      <Badge variant="white">
                        {consultation.prescriptions
                          .map(
                            (prescription) => prescription.medications.length,
                          )
                          .reduce((a, b) => a + b, 0)}{" "}
                        total medications.
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
