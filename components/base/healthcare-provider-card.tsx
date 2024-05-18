"use client";

import React from "react";

import Image from "next/image";
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
import { BriefcaseIcon, MapPinIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface HealthcareProviderCardProps {
  healthcareProvider: HealthCareProvider & {
    user: User;
  } & {
    openingHours: OpeningHours[];
  } & {
    absences: Absence[];
  };
}

export function HealthcareProviderCard({
  healthcareProvider,
}: HealthcareProviderCardProps) {
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
      getIndexesOfClosedDays()?.[i] ?? 0,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 7,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 14,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 21,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 28,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 35,
    ];

    closedDays.push(...array);
  }

  const isClosed = (dayIndex: number) => {
    return closedDays.includes(dayIndex);
  };

  return (
    <div className="grid grid-cols-1 rounded-lg border bg-white p-6 shadow-sm sm:grid-cols-2">
      <div className="flex flex-col border-r pr-6">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gray-200">
            <Image
              src={healthcareProvider.user.image || "/placeholder.svg"}
              alt={healthcareProvider.user.name}
              className="h-full rounded-lg object-cover"
              style={{ objectPosition: "center" }}
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <h2 className="text-lg font-semibold">
              Dr. {healthcareProvider.user.name}
            </h2>
            <div className="flex items-center gap-1.5">
              <BriefcaseIcon className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-muted-foreground">
                {healthcareProvider.speciality}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4 text-blue-600" />
              <p className="max-w-[250px] truncate text-sm text-muted-foreground">
                {healthcareProvider.officeAddress}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-1.5">
          <h3 className="text-sm font-semibold">Payment Options</h3>
          <p className="text-sm text-muted-foreground">
            {healthcareProvider.paymentMethods.join(", ") || "N/A"}
          </p>

          <h3 className="text-sm font-semibold">Expertises and acts</h3>
          <p className="text-sm text-muted-foreground">
            {healthcareProvider.services.join(", ") || "N/A"}
          </p>

          <h3 className="text-sm font-semibold">Insurance</h3>
          <p className="text-sm text-muted-foreground">
            {healthcareProvider.insurances.join(", ") || "N/A"}
          </p>
        </div>

        <div className="mt-4 flex flex-col space-y-2.5">
          <Button size="sm" variant="blue" asChild>
            <Link
              href={`/book/healthcare-providers/${healthcareProvider.id}/${format(selectedDay, "yyyy-MM-dd")}`}
            >
              Book an appointment
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/hp/profile/${healthcareProvider.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </div>

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
                    healthcareProvider.absences?.some((absence) =>
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
                  healthcareProvider.absences?.some((absence) =>
                    isSameDay(absence.date, day),
                  ) &&
                    "cursor-not-allowed bg-[url('/images/pattern.png')] bg-cover",
                  isClosed(dayIdx) &&
                    "cursor-not-allowed bg-rose-400 text-white hover:bg-rose-400",
                  isBefore(day, startOfToday()) &&
                    "cursor-not-allowed opacity-50",
                  "mx-auto flex h-9 w-9 items-center justify-center rounded",
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
    </div>
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
