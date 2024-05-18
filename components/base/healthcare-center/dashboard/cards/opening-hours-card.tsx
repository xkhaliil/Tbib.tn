import React from "react";

import Link from "next/link";
import { HealthCareCenter, OpeningHours, User } from "@prisma/client";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OpeningHoursCardProps {
  healthcareCenter:
    | (HealthCareCenter & {
        user: User;
      } & {
        openingHours: OpeningHours[];
      })
    | null;
}

export function OpeningHoursCard({ healthcareCenter }: OpeningHoursCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle>Opening Hours</CardTitle>
          <CardDescription>
            Here all the opening hours of your healthcare center.
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center">
          <Button variant="blue" size="sm" asChild>
            <Link href="/hc/dashboard/opening-hours">Manage</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="flex flex-col space-y-6">
          {healthcareCenter?.openingHours.map((openingHour, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b pb-4 last:border-none"
            >
              <div className="font-medium">
                {getDayByIndex(openingHour.dayOfWeek)}
              </div>
              {!openingHour.isClosed && (
                <div className="text-muted-foreground">
                  {format(openingHour.startTime, "HH:mm")} -{" "}
                  {format(openingHour.endTime, "HH:mm")}
                </div>
              )}
              {openingHour.isClosed && (
                <span className="rounded-sm bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-600">
                  Closed
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 p-6">
        <div className="text-xs text-muted-foreground">
          Last updated on{" "}
          {format(
            new Date(healthcareCenter?.openingHours[0].createdAt || new Date()),
            "MMMM dd, yyyy",
          )}
        </div>
      </CardFooter>
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
