"use client";

import React from "react";

import { getPatientRecord } from "@/actions/patient";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CurrentMedicationsFormProps {
  record: Awaited<ReturnType<typeof getPatientRecord>>;
}

export function CurrentMedicationsForm({
  record,
}: CurrentMedicationsFormProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
          <CardDescription>
            Medications the patient is currently taking.
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        <div className="grid gap-4">
          {record?.currentMedications?.length ? (
            record.currentMedications.map((medication) => (
              <div
                key={medication.id}
                className="flex items-center space-x-4 rounded-xl border p-4"
              >
                <div className="flex-1">
                  <p className="font-semibold tracking-tight">
                    {medication.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {medication.dosage}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {medication.duration}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No medications</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
