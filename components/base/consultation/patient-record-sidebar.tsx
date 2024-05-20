import React from "react";

import Image from "next/image";
import { getPatientById } from "@/actions/patient";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface PatientRecordSidebarProps {
  patient: Awaited<ReturnType<typeof getPatientById>>;
}

export function PatientRecordSidebar({ patient }: PatientRecordSidebarProps) {
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

      <div className="flex flex-1 flex-col space-y-6 overflow-y-auto p-4">
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
                  {patient?.chronicDiseases?.length ? (
                    <ul className="list-inside list-disc">
                      {patient?.chronicDiseases?.map((disease) => (
                        <li key={disease}>{disease}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No chronic diseases</p>
                  )}

                  <h4 className="text-xs font-semibold text-muted-foreground">
                    Surgeries
                  </h4>

                  {patient?.surgeries?.length ? (
                    <ul className="list-inside list-disc">
                      {patient?.surgeries?.map((surgery) => (
                        <li key={surgery}>{surgery}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No surgeries</p>
                  )}

                  <h4 className="text-xs font-semibold text-muted-foreground">
                    Vaccinations
                  </h4>

                  {patient?.vaccinations?.length ? (
                    <ul className="list-inside list-disc">
                      {patient?.vaccinations?.map((vaccination) => (
                        <li key={vaccination}>{vaccination}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No vaccinations</p>
                  )}

                  <h4 className="text-xs font-semibold text-muted-foreground">
                    Family History
                  </h4>

                  {patient?.familyHistory?.length ? (
                    <ul className="list-inside list-disc">
                      {patient?.familyHistory?.map((history) => (
                        <li key={history}>{history}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No family history</p>
                  )}
                </Card>
                <Card className="flex flex-col space-y-3 p-3 shadow-none">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    Allergies
                  </h3>
                  {patient?.allergies?.length ? (
                    <ul className="list-inside list-disc">
                      {patient?.allergies?.map((allergy) => (
                        <li key={allergy}>{allergy}</li>
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
                    <p className="text-xs text-muted-foreground">Smoking</p>
                    <p className="text-xs text-muted-foreground">
                      {patient?.smoker || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Alcohol</p>
                    <p className="text-xs text-muted-foreground">
                      {patient?.alcohol || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Occupation</p>
                    <p className="text-xs text-muted-foreground">
                      {patient?.occupation || "N/A"}
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

                  {patient?.prescriptions?.length ? (
                    <ul className="list-inside list-disc">
                      {patient?.prescriptions?.map((prescription) => {
                        return prescription.medications.map(
                          (medication: string) => (
                            <li key={medication}>{medication}</li>
                          ),
                        );
                      })}
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
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>

                  <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                    {patient?.weight || "N/A"} kg
                  </Card>
                </Card>

                <Card className="flex items-center justify-between p-3 shadow-none">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Height
                    </h3>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>

                  <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                    {patient?.height || "N/A"} cm
                  </Card>
                </Card>

                <Card className="flex items-center justify-between p-3 shadow-none">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      BMI
                    </h3>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>

                  <Card className="rounded p-2 text-xs font-semibold text-foreground shadow-none">
                    {patient?.bmi || "N/A"}
                  </Card>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
