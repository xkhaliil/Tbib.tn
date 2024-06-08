"use client";

import React from "react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
            View the patient's history and medical records.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 grid gap-4">
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
                  <Button variant="outline" size="sm">
                    View Details
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

          <Separator />

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

                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            window.open(document.url, "_blank");
                          }}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center">
                        <span>Download</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
