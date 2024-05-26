"use client";

import React from "react";

import Link from "next/link";
import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  User,
} from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isSameDay,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookAppointmentCalendarProps {
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

export function BookAppointmentCard({
  healthcareProvider,
}: BookAppointmentCalendarProps) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const getIndexesOfClosedDays = () => {
    return healthcareProvider?.openingHours
      ?.filter((openingHour) => openingHour.isClosed)
      .map((openingHour) => openingHour.dayOfWeek);
  };

  const closedDays: number[] = [];

  for (let i = 0; i <= getIndexesOfClosedDays()?.length! ?? 0; i++) {
    const array = [
      getIndexesOfClosedDays()?.[i],
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 7,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 14,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 21,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 28,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 35,
    ];

    //@ts-ignore
    closedDays.push(...array);
  }

  const isClosed = (dayIndex: number) => {
    return closedDays.includes(dayIndex);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>
            Book an appointment with Dr. {healthcareProvider?.user.name}
          </CardTitle>
          <CardDescription>
            Schedule an appointment with Dr. {healthcareProvider?.user.name} by
            selecting a date and time.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-1">
        <div className="flex flex-col p-4">
          <div className="mb-6 flex items-center justify-between px-4">
            <Button variant="outline" size="smallIcon" onClick={previousMonth}>
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <h2 className="text-sm font-medium text-foreground">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <Button variant="outline" size="smallIcon" onClick={nextMonth}>
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs leading-6 text-muted-foreground">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="mt-2 grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={cn(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-1.5",
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (
                      healthcareProvider?.absences?.some((absence) =>
                        isSameDay(absence.date, day),
                      ) ||
                      isClosed(dayIdx) ||
                      isBefore(day, startOfToday())
                    )
                      return;
                    setSelectedDay(day);
                  }}
                  className={cn(
                    isSameDay(day, selectedDay) && "bg-blue-600 text-white",
                    healthcareProvider?.absences?.some((absence) =>
                      isSameDay(absence.date, day),
                    ) &&
                      "cursor-not-allowed bg-[url('/images/pattern.png')] bg-cover",
                    isClosed(dayIdx) &&
                      "cursor-not-allowed bg-rose-200 text-white hover:bg-rose-200",
                    isBefore(day, startOfToday()) &&
                      "cursor-not-allowed opacity-50",
                    "mx-auto flex h-10 w-10 items-center justify-center rounded",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t bg-muted/50 p-6">
        <Button variant="blue" size="lg" className="w-full" asChild>
          <Link
            href={`/book/healthcare-providers/${healthcareProvider?.id}/${format(selectedDay, "yyyy-MM-dd")}`}
          >
            Next
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
