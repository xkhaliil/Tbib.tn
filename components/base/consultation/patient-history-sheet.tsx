"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import {
  getPatientConsultationsWithHealthcareProvider,
  getPatientDocuments,
} from "@/actions/patient";
import { format, formatDistance } from "date-fns";
import {
  DownloadIcon,
  FileTextIcon,
  PanelLeftCloseIcon,
  StethoscopeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PatientHistorySheetProps {
  consultations: Awaited<
    ReturnType<typeof getPatientConsultationsWithHealthcareProvider>
  >;
  medicalDocuments: Awaited<ReturnType<typeof getPatientDocuments>>;
}

export function PatientHistorySheet({
  consultations,
  medicalDocuments,
}: PatientHistorySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="white" size="sm">
          Patient History
          <PanelLeftCloseIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader className="text-left">
          <SheetTitle>Patient History</SheetTitle>
          <SheetDescription>
            View the patient&apos;s history and medical records.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 grid gap-4">
          {consultations?.length === 0 && medicalDocuments?.length === 0 && (
            <div className="flex flex-col rounded-xl border bg-muted/40 p-8 pt-0">
              <Image
                src="/empty-folder.svg"
                alt="Empty"
                width="1000"
                height="1000"
                className="mx-auto h-48 w-48"
              />
              <div className="flex flex-col">
                <h1 className="text-center text-lg font-semibold tracking-tight">
                  No history or medical records found
                </h1>
                <p className="text-center text-sm text-muted-foreground">
                  The patient has no consultations or medical documents.
                </p>
              </div>
            </div>
          )}

          {consultations?.map((consultation) => (
            <div key={consultation.id} className="space-y-2.5">
              <h1 className="text-sm font-semibold tracking-tight text-muted-foreground">
                Consultations
              </h1>
              <Card className="p-4 shadow-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500">
                      <StethoscopeIcon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold tracking-tight text-muted-foreground">
                      Consultation
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/hp/dashboard/consultations/existing-consultation/${consultation.id}`}
                    >
                      View Details
                    </Link>
                  </Button>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {format(
                      new Date(consultation.appointment.date),
                      "EEEE, do MMMM yyyy",
                    )}
                  </p>
                </div>
              </Card>
            </div>
          ))}

          {(medicalDocuments?.length ?? 0) > 0 &&
            (consultations?.length ?? 0) > 0 && <Separator />}

          {medicalDocuments?.map((document) => (
            <div key={document.id} className="space-y-2.5">
              <h1 className="text-sm font-semibold tracking-tight text-muted-foreground">
                Medical Documents
              </h1>
              <Card className="p-4 shadow-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500">
                      <FileTextIcon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold tracking-tight text-muted-foreground">
                      {document.name}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      window.open(document.url, "_blank");
                    }}
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {document.description}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {document.createdAt &&
                      format(
                        new Date(document.createdAt),
                        "EEEE, do MMMM yyyy",
                      )}{" "}
                    - {formatDistance(new Date(document.createdAt), new Date())}{" "}
                    ago
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
