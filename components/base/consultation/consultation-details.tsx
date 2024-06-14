import React from "react";

import { getConsultationById } from "@/actions/consultation";
import { getPatientRecord } from "@/actions/patient";
import { format } from "date-fns";
import { MdOutlineSick } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ConsultationDetailsProps {
  consultation: Awaited<ReturnType<typeof getConsultationById>>;
  record: Awaited<ReturnType<typeof getPatientRecord>>;
}

export function ConsultationDetails({
  consultation,
  record,
}: ConsultationDetailsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Medical Observation</CardTitle>
          <CardDescription>
            Medical observation and notes from the consultation.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label>Diagnosis</Label>
              <div className="w-full rounded-xl border p-4">
                <p className="text-sm">{consultation?.diagnosis}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Follow Up</Label>
              <div className="w-full rounded-xl border p-4">
                <p className="text-sm">{consultation?.followUp}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Additional Notes</Label>
              <div className="w-full rounded-xl border p-4">
                <p className="text-sm">{consultation?.notes}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col space-y-1.5">
            <h1 className="font-semibold leading-none tracking-tight">
              Follow Up Information
            </h1>
            <p className="text-sm text-muted-foreground">
              This section contains the patient's follow up information.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <h1 className="text-sm font-semibold tracking-tight">Height</h1>
              <div className="flex flex-col text-right">
                <p className="text-xs">{record?.height || "Not available"}</p>
                <span className="text-xs text-muted-foreground">
                  Last modified on{" "}
                  {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <h1 className="text-sm font-semibold tracking-tight">Weight</h1>
              <div className="flex flex-col text-right">
                <p className="text-xs">{record?.weight || "Not available"}</p>
                <span className="text-xs text-muted-foreground">
                  Last modified on{" "}
                  {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <h1 className="text-sm font-semibold tracking-tight">
                Blood Pressure
              </h1>
              <div className="flex flex-col text-right">
                <p className="text-xs">
                  {record?.bloodPressure || "Not available"}
                </p>
                <span className="text-xs text-muted-foreground">
                  Last modified on{" "}
                  {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <h1 className="text-sm font-semibold tracking-tight">BMI</h1>
              <div className="flex flex-col text-right">
                <p className="text-xs">{record?.bmi || "Not available"}</p>
                <span className="text-xs text-muted-foreground">
                  Last modified on{" "}
                  {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {consultation?.prescriptions && consultation.prescriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Prescription</CardTitle>
            <CardDescription>
              Prescription and medication details from the consultation.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="space-y-4">
              {consultation.prescriptions.map((prescription) => (
                <div key={prescription.id} className="flex flex-col space-y-2">
                  <Label>Medications</Label>
                  {prescription.medications.length === 0 ? (
                    <div className="w-full rounded-xl border p-4">
                      <p className="text-center text-sm text-muted-foreground">
                        No medications prescribed.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full rounded-xl border p-4">
                      {prescription.medications.map((medication) => (
                        <div key={medication.id} className="flex flex-col">
                          <p className="text-sm">
                            {medication.name} - {medication.dosage} -{" "}
                            {medication.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {consultation.prescriptions.map((prescription) => (
                <div key={prescription.id} className="space-y-4">
                  {prescription.biologyTestType ? (
                    <div className="flex flex-col space-y-2">
                      <Label>Biology Test</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-sm">
                          {prescription.biologyTestType}
                        </p>
                        <p className="text-sm">
                          {prescription.biologyTestReason}
                        </p>
                        <p className="text-sm">
                          {prescription.biologyTestNotes}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Label>Biology Test</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-center text-sm text-muted-foreground">
                          No biology test prescribed.
                        </p>
                      </div>
                    </div>
                  )}

                  {prescription.imagingStudyType ? (
                    <div className="flex flex-col space-y-2">
                      <Label>Imaging Study</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-sm">
                          {prescription.imagingStudyType}
                        </p>
                        <p className="text-sm">
                          {prescription.imagingStudyReason}
                        </p>
                        <p className="text-sm">
                          {prescription.imagingStudyNotes}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Label>Imaging Study</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-center text-sm text-muted-foreground">
                          No imaging study prescribed.
                        </p>
                      </div>
                    </div>
                  )}

                  {prescription.medicalCertificateType ? (
                    <div className="flex flex-col space-y-2">
                      <Label>Medical Certificate</Label>
                      <div className="w-full rounded-xl border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h1 className="text-sm font-semibold">
                            {prescription.medicalCertificateType === "sick"
                              ? "Sick Leave"
                              : "Medical Certificate"}
                          </h1>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                          >
                            <MdOutlineSick className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <p className="text-sm">
                            <span className="font-semibold">Purpose:</span>{" "}
                            {prescription.medicalCertificatePurpose}
                          </p>

                          <p className="text-sm">
                            <span className="font-semibold">Start Date:</span>{" "}
                            {format(
                              new Date(
                                prescription.medicalCertificateStartDate ||
                                  new Date(),
                              ),
                              "do MMMM yyyy",
                            )}
                          </p>

                          <p className="text-sm">
                            <span className="font-semibold">End Date:</span>{" "}
                            {format(
                              new Date(
                                prescription.medicalCertificateEndDate ||
                                  new Date(),
                              ),
                              "do MMMM yyyy",
                            )}
                          </p>

                          <p className="text-sm">
                            <span className="font-semibold">Notes:</span>{" "}
                            {prescription.medicalCertificateNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Label>Medical Certificate</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-center text-sm text-muted-foreground">
                          No medical certificate prescribed.
                        </p>
                      </div>
                    </div>
                  )}

                  {prescription.paramedicalActType ? (
                    <div className="flex flex-col space-y-2">
                      <Label>Paramedical Act</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-sm">
                          {prescription.paramedicalActType}
                        </p>
                        <p className="text-sm">
                          {prescription.paramedicalActReason}
                        </p>
                        <p className="text-sm">
                          {prescription.paramedicalActDuration}
                        </p>
                        <p className="text-sm">
                          {prescription.paramedicalActNotes}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Label>Paramedical Act</Label>
                      <div className="w-full rounded-xl border p-4">
                        <p className="text-center text-sm text-muted-foreground">
                          No paramedical act prescribed.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
