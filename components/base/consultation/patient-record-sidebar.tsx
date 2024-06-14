import React from "react";

import Image from "next/image";
import { getPatientById, getPatientRecord } from "@/actions/patient";
import { BloodType } from "@prisma/client";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatientRecordSidebarProps {
  patient: Awaited<ReturnType<typeof getPatientById>>;
  record: Awaited<ReturnType<typeof getPatientRecord>>;
}

export function PatientRecordSidebar({
  patient,
  record,
}: PatientRecordSidebarProps) {
  const getBloodType = (bloodType: BloodType | null | undefined) => {
    switch (bloodType) {
      case BloodType.A_NEGATIVE:
        return "A-";
      case BloodType.A_POSITIVE:
        return "A+";
      case BloodType.AB_NEGATIVE:
        return "AB-";
      case BloodType.AB_POSITIVE:
        return "AB+";
      case BloodType.B_NEGATIVE:
        return "B-";
      case BloodType.B_POSITIVE:
        return "B+";
      case BloodType.O_NEGATIVE:
        return "O-";
      case BloodType.O_POSITIVE:
        return "O+";
    }
  };
  return (
    <aside className="row-start-1 row-end-3 flex h-screen w-[22rem] flex-col border-r bg-white">
      <div className="relative flex h-28 items-center justify-between overflow-hidden border-b bg-blue-50 p-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold tracking-tight">
            {patient?.user.gender ? "Mr." : "Mrs."} {patient?.user.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {format(
              new Date(patient?.user.dateOfBirth || new Date()),
              "dd/MM/yyyy",
            )}{" "}
            (
            {new Date().getFullYear() -
              new Date(
                patient?.user.dateOfBirth || new Date(),
              ).getFullYear()}{" "}
            years)
          </p>
        </div>
        <Image
          src="/folder.svg"
          alt="folder"
          width={50}
          height={50}
          className="absolute bottom-0 right-0 top-0 mt-5 h-28 w-28"
        />
      </div>

      <ScrollArea className="flex flex-1 flex-col p-4">
        <div className="space-y-6">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="background-and-lifestyle"
          >
            <AccordionItem value="background-and-lifestyle">
              <AccordionTrigger className="rounded-xl bg-blue-50 px-4 font-bold uppercase tracking-wider">
                <span className="text-xs">Background and Lifestyle</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                <div className="flex flex-col space-y-4">
                  <Card className="flex flex-col space-y-3 p-3 shadow-none">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Background
                    </h3>

                    <h4 className="text-xs font-semibold text-muted-foreground">
                      Chronic Diseases
                    </h4>
                    {record?.chronicDiseases?.length ? (
                      <ul className="list-inside list-disc">
                        {record?.chronicDiseases?.map((disease) => (
                          <li key={disease} className="max-w-[16rem] truncate">
                            {disease}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        No chronic diseases
                      </p>
                    )}

                    <h4 className="text-xs font-semibold text-muted-foreground">
                      Surgeries
                    </h4>

                    {record?.surgeries?.length ? (
                      <ul className="list-inside list-disc">
                        {record?.surgeries?.map((surgery) => (
                          <li key={surgery} className="max-w-[16rem] truncate">
                            {surgery}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No surgeries</p>
                    )}

                    <h4 className="text-xs font-semibold text-muted-foreground">
                      Vaccinations
                    </h4>

                    {record?.vaccinations?.length ? (
                      <ul className="list-inside list-disc">
                        {record?.vaccinations?.map((vaccination) => (
                          <li
                            key={vaccination}
                            className="max-w-[16rem] truncate"
                          >
                            {vaccination}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No vaccinations</p>
                    )}

                    <h4 className="text-xs font-semibold text-muted-foreground">
                      Family History
                    </h4>

                    {record?.familyHistory?.length ? (
                      <ul className="list-inside list-disc">
                        {record?.familyHistory?.map((history) => (
                          <li key={history} className="max-w-[16rem] truncate">
                            {history}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No family history</p>
                    )}

                    <h4 className="text-xs font-semibold text-muted-foreground">
                      Blood Type
                    </h4>

                    {record?.bloodType ? (
                      <ul className="list-inside list-disc">
                        <li>{getBloodType(record?.bloodType)}</li>
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No blood type</p>
                    )}
                  </Card>
                  <Card className="flex flex-col space-y-3 p-3 shadow-none">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Allergies
                    </h3>
                    {record?.allergies?.length ? (
                      <ul className="list-inside list-disc">
                        {record?.allergies?.map((allergy) => (
                          <li key={allergy} className="max-w-[16rem] truncate">
                            {allergy}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No allergies</p>
                    )}
                  </Card>
                  <Card className="flex flex-col space-y-3 p-3 shadow-none">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Lifestyle
                    </h3>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Smoking</p>
                      <p className="text-sm text-muted-foreground">
                        {record?.smoker ? "Yes" : "No" || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Alcohol</p>
                      <p className="text-sm text-muted-foreground">
                        {record?.alcohol ? "Yes" : "No" || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Occupation
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record?.occupation || "N/A"}
                      </p>
                    </div>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="current-medications">
              <AccordionTrigger className="rounded-xl bg-blue-50 px-4 font-bold uppercase tracking-wider">
                <span className="text-xs">Current Medications</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                <div className="flex flex-col space-y-4">
                  <Card className="flex flex-col space-y-3 p-3 shadow-none">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Medications
                    </h3>

                    {record?.currentMedications?.length ? (
                      <ul className="list-inside list-disc">
                        {record?.currentMedications?.map((medication) => (
                          <li key={medication.id}>
                            {medication.name} - {medication.dosage}{" "}
                            {medication.duration}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No medications</p>
                    )}
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="follow-up-data">
              <AccordionTrigger className="rounded-xl bg-blue-50 px-4 font-bold uppercase tracking-wider">
                <span className="text-xs">Follow-up data</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                <div className="flex flex-col space-y-4">
                  <Card className="flex items-center justify-between p-3 shadow-none">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Weight
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                      </p>
                    </div>

                    <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                      {record?.weight || "N/A"} kg
                    </Card>
                  </Card>

                  <Card className="flex items-center justify-between p-3 shadow-none">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Height
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                      </p>
                    </div>

                    <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                      {record?.height || "N/A"} cm
                    </Card>
                  </Card>

                  <Card className="flex items-center justify-between p-3 shadow-none">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Blood Pressure
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                      </p>
                    </div>

                    <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                      {record?.bloodPressure || "N/A"} mmHg
                    </Card>
                  </Card>

                  <Card className="flex items-center justify-between p-3 shadow-none">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        BMI
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                      </p>
                    </div>

                    <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                      {record?.bmi || "N/A"}
                    </Card>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
}
