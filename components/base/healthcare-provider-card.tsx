"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  Review,
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
import { BriefcaseIcon, MapPinIcon, Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface HealthcareProviderCardProps {
  healthcareProvider: HealthCareProvider & {
    user: User;
  } & {
    openingHours: OpeningHours[];
  } & {
    absences: Absence[];
  } & {
    reviews: Review[];
  };
}

export function HealthcareProviderCard({
  healthcareProvider,
}: HealthcareProviderCardProps) {
  const router = useRouter();
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

  const calculateAverageRating = () => {
    if (healthcareProvider?.reviews) {
      const total = healthcareProvider.reviews.length || 1;
      return (
        healthcareProvider.reviews.reduce(
          (acc, review) => acc + review.rating,
          0,
        ) / total
      );
    }
    return 0;
  };

  const calculateReviewsCount = () => {
    return healthcareProvider.reviews.length;
  };

  React.useEffect(() => {
    if (
      healthcareProvider.absences?.some((absence) =>
        isSameDay(absence.date, selectedDay),
      ) ||
      isClosed(getDay(selectedDay)) ||
      isBefore(selectedDay, startOfToday())
    ) {
      setSelectedDay(add(selectedDay, { days: 1 }));
    }
  }, [selectedDay]);

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
              <Star className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-muted-foreground">
                {calculateAverageRating().toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">
                ({calculateReviewsCount()}
                {calculateReviewsCount() > 1 ? " reviews" : " review"})
              </p>
            </div>
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

        <div className="mt-auto flex flex-col space-y-2.5">
          <Button size="lg" variant="outline" asChild>
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
                  router.push(
                    `/book/healthcare-providers/${healthcareProvider.id}/${format(
                      day,
                      "yyyy-MM-dd",
                    )}`,
                  );
                }}
                className={cn(
                  isSameDay(day, selectedDay) && "bg-blue-600 text-white",
                  healthcareProvider.absences?.some((absence) =>
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
