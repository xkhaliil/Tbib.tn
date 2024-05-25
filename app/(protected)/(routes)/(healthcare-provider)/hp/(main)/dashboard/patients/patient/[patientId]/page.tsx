import React from "react";

import Link from "next/link";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import {
  getPatientByIdForHealthcareProvider,
  getPatientDocuments,
  getPatientRecord,
} from "@/actions/patient";
import { AppointmentStatus, BloodType } from "@prisma/client";
import { format, formatDistance } from "date-fns";
import {
  AtSignIcon,
  CakeIcon,
  FileTextIcon,
  MapPinnedIcon,
  PhoneCallIcon,
} from "lucide-react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface HealthcareProviderPatientDetailsPageProps {
  params: {
    patientId: string;
  };
}

export default async function HealthcareProviderPatientDetailsPage({
  params,
}: HealthcareProviderPatientDetailsPageProps) {
  const currentUser = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(
    currentUser?.id,
  );
  const patient = await getPatientByIdForHealthcareProvider(
    params.patientId,
    healthcareProvider?.id,
  );

  console.log("[PATIENT] page.tsx", patient);

  const record = await getPatientRecord(
    params.patientId,
    healthcareProvider?.id,
  );

  const medicalDocuments = await getPatientDocuments(params.patientId);

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
    <div className="grid h-screen grid-cols-[70px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar className="col-start-2" />
      <Sidebar />
      <ScrollArea className="col-start-2 bg-secondary p-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={patient?.user.image || "/placeholder.svg"} />
                <AvatarFallback>{patient?.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  {patient?.user.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {patient?.user.email} • Joined on{" "}
                  {format(
                    new Date(patient?.user.createdAt || new Date()),
                    "EEEE, MMMM do, yyyy",
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="h-[410px] shadow-none">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  This section displays the personal information of the patient.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {patient?.user.gender === "MALE" ? (
                      <BsGenderMale className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <BsGenderFemale className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Gender
                      </h3>
                      <p className="text-sm">
                        {patient?.user.gender === "MALE" ? "Male" : "Female"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <CakeIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Date of Birth
                      </h3>
                      <p className="text-sm">
                        {format(
                          new Date(patient?.user.dateOfBirth || new Date()),
                          "EEEE, MMMM do, yyyy",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <PhoneCallIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Phone Number
                      </h3>
                      <p className="text-sm">(+216) {patient?.user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <AtSignIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Email
                      </h3>
                      <p className="text-sm">{patient?.user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPinnedIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Address
                      </h3>
                      <p className="text-sm">
                        {patient?.user.state}, {patient?.user.city},{" "}
                        {patient?.user.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-[410px] overflow-y-auto shadow-none">
              <CardHeader>
                <CardTitle>Appointments Schedule</CardTitle>
                <CardDescription>
                  This section displays all the appointments scheduled for the
                  patient.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative border-s border-dashed">
                  {patient?.appointments.some((appointment) => {
                    return (
                      appointment.healthCareProviderId ===
                      healthcareProvider?.id
                    );
                  }) ? (
                    patient?.appointments.map((appointment) => {
                      if (
                        appointment.healthCareProviderId ===
                        healthcareProvider?.id
                      ) {
                        return (
                          <li className="mb-10 ms-6" key={appointment.id}>
                            <span className="absolute -start-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-sky-500 bg-white">
                              <span className="h-2 w-2 rounded-full bg-sky-500" />
                            </span>
                            <h3 className="mb-2.5 text-sm font-medium text-muted-foreground">
                              {format(
                                new Date(appointment.date || new Date()),
                                "EEEE, MMMM do, yyyy",
                              )}
                            </h3>
                            <div className="block rounded-xl border p-4">
                              <h1 className="mb-1 text-base font-semibold tracking-tight">
                                {appointment.title || "Untitled"}
                              </h1>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      "flex h-4 w-4 items-center justify-center rounded",
                                      appointment.status ===
                                        AppointmentStatus.COMPLETED &&
                                        "bg-sky-300",
                                      appointment.status ===
                                        AppointmentStatus.PENDING &&
                                        "bg-[#FFE097]",
                                      appointment.status ===
                                        AppointmentStatus.UPCOMING &&
                                        "bg-teal-300",
                                      appointment.status ===
                                        AppointmentStatus.CANCELLED &&
                                        "bg-red-400",
                                      appointment.status ===
                                        AppointmentStatus.EXPIRED &&
                                        "bg-rose-500/35",
                                    )}
                                  />
                                  <p className="text-sm font-normal text-muted-foreground">
                                    {appointment.status}
                                  </p>
                                </div>

                                <Separator
                                  orientation="vertical"
                                  className="h-4"
                                />

                                <p className="text-sm font-normal text-muted-foreground">
                                  {format(
                                    new Date(
                                      appointment.startTime || new Date(),
                                    ),
                                    "HH:mm",
                                  )}{" "}
                                  -{" "}
                                  {format(
                                    new Date(appointment.endTime || new Date()),
                                    "HH:mm",
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    })
                  ) : (
                    <p className="text-base font-normal text-muted-foreground">
                      No appointments scheduled for this patient.
                    </p>
                  )}
                </ol>
              </CardContent>
            </Card>

            <Card className="h-[410px] overflow-hidden shadow-none">
              <CardHeader>
                <CardTitle>Medical Record</CardTitle>
                <CardDescription>
                  This section displays the medical record of the patient.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full w-full flex-1">
                <ScrollArea className="w-full">
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Background
                      </h3>

                      <h4 className="text-xs font-semibold text-muted-foreground">
                        Chronic Diseases
                      </h4>
                      {record?.chronicDiseases?.length ? (
                        <ul className="list-inside list-disc text-sm">
                          {record?.chronicDiseases?.map((disease) => (
                            <li key={disease}>{disease}</li>
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
                        <ul className="list-inside list-disc text-sm">
                          {record?.surgeries?.map((surgery) => (
                            <li key={surgery}>{surgery}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No surgeries</p>
                      )}

                      <h4 className="text-xs font-semibold text-muted-foreground">
                        Vaccinations
                      </h4>

                      {record?.vaccinations?.length ? (
                        <ul className="list-inside list-disc text-sm">
                          {record?.vaccinations?.map((vaccination) => (
                            <li key={vaccination}>{vaccination}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No vaccinations</p>
                      )}

                      <h4 className="text-xs font-semibold text-muted-foreground">
                        Family History
                      </h4>

                      {record?.familyHistory?.length ? (
                        <ul className="list-inside list-disc text-sm">
                          {record?.familyHistory?.map((history) => (
                            <li key={history}>{history}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">
                          No family history
                        </p>
                      )}

                      <h4 className="text-xs font-semibold text-muted-foreground">
                        Blood Type
                      </h4>

                      <ul className="list-inside list-disc text-sm">
                        <li>{getBloodType(record?.bloodType)}</li>
                      </ul>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Allergies
                      </h3>
                      {record?.allergies?.length ? (
                        <ul className="list-inside list-disc text-sm">
                          {record?.allergies?.map((allergy) => (
                            <li key={allergy}>{allergy}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No allergies</p>
                      )}

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
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Medical Documents</CardTitle>
                <CardDescription>
                  This section displays all the medical documents related to the
                  patient.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {medicalDocuments?.map((document) => (
                  <div
                    className="flex items-center space-x-4"
                    key={document.id}
                  >
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                      >
                        <FileTextIcon className="h-5 w-5 text-blue-600" />
                      </Button>
                    </div>

                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="flex flex-col">
                        <h1 className="text-sm font-semibold">
                          {document.name}
                        </h1>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          Uploaded on{" "}
                          {format(new Date(document.createdAt), "MMM dd, yyyy")}{" "}
                          (
                          {formatDistance(
                            new Date(document.createdAt),
                            new Date(),
                          )}{" "}
                          ago)
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={document.url} target="_blank">
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {medicalDocuments?.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground">
                    No recent medical documents.
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>
                  This section displays all the current medications prescribed
                  to the patient.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  {record?.currentMedications?.length ? (
                    <ul className="list-inside list-disc text-sm">
                      {record?.currentMedications?.map((medication) => (
                        <li key={medication.id}>
                          {medication.name} - {medication.dosage} for{" "}
                          {medication.duration}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-sm text-muted-foreground">
                      No medications
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Follow Up</CardTitle>
                <CardDescription>
                  This section displays the follow up data of the patient.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card className="flex items-center justify-between p-4 shadow-none">
                    <CardHeader className="p-0">
                      <CardTitle>Weight</CardTitle>
                    </CardHeader>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {record?.weight || "N/A"}{" "}
                      <span className="text-sm text-muted-foreground">kg</span>
                    </h1>
                  </Card>

                  <Card className="flex items-center justify-between p-4 shadow-none">
                    <CardHeader className="p-0">
                      <CardTitle>Height</CardTitle>
                    </CardHeader>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {record?.height || "N/A"}{" "}
                      <span className="text-sm text-muted-foreground">cm</span>
                    </h1>
                  </Card>

                  <Card className="flex items-center justify-between p-4 shadow-none">
                    <CardHeader className="p-0">
                      <CardTitle>Blood Pressure</CardTitle>
                    </CardHeader>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {record?.bloodPressure || "N/A"}{" "}
                      <span className="text-sm text-muted-foreground">
                        mmHg
                      </span>
                    </h1>
                  </Card>

                  <Card className="flex items-center justify-between p-4 shadow-none">
                    <CardHeader className="p-0">
                      <CardTitle>BMI</CardTitle>
                    </CardHeader>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {record?.bmi || "N/A"}{" "}
                      <span className="text-sm text-muted-foreground">
                        kg/m²
                      </span>
                    </h1>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </Card>
      </ScrollArea>
    </div>
  );
}
