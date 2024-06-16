import React from "react";

import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  User,
} from "@prisma/client";
import { addHours, format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OpeningHoursCardProps {
  healthcareProvider:
    | (HealthCareProvider & {
        user: User;
      } & {
        openingHours: OpeningHours[];
      } & {
        absences: Absence[];
      })
    | null;
}

export function OpeningHoursCard({
  healthcareProvider,
}: OpeningHoursCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>Opening Hours</CardTitle>
          <CardDescription>
            Here are the opening hours of the healthcare provider.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="max-w-md list-inside space-y-1.5 text-muted-foreground">
          {healthcareProvider?.openingHours
            .filter((openingHour) => openingHour.isClosed === false)
            .map((openingHour, idx) => (
              <li key={idx} className="flex items-center text-sm">
                <p className="font-medium text-foreground">
                  {getDayByIndex(openingHour.dayOfWeek)} :
                </p>
                <span className="ms-1">
                  {process.env.NODE_ENV === "production" && (
                    <span>
                      {format(addHours(openingHour.startTime, 1), "HH:mm")} -{" "}
                      {format(addHours(openingHour.endTime, 1), "HH:mm")}
                    </span>
                  )}
                  {process.env.NODE_ENV === "development" && (
                    <span>
                      {format(openingHour.startTime, "HH:mm")} -{" "}
                      {format(openingHour.endTime, "HH:mm")}
                    </span>
                  )}
                </span>
              </li>
            ))}
        </ul>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-1.5">
          <h2 className="font-semibold tracking-tight">Emergency contact</h2>
          <p className="text-sm">
            In case of emergency, please call the following number :{" "}
            <span className="font-medium">
              {healthcareProvider?.user.phone}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function getDayByIndex(index: number) {
  switch (index) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Unknown";
  }
}
