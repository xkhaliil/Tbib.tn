"use client";

import { useState } from "react";

import { Absence } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfWeek,
} from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface CalendarProps {
  selectedDay: Date;
  setSelectedDay: (day: Date) => void;
  disabledDates?: (date: Date) => boolean;
  absences?: Absence[];
}

export function Calendar({
  selectedDay,
  setSelectedDay,
  disabledDates,
  absences,
}: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
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
      <div className="mt-4 grid grid-cols-7 text-center text-xs leading-6 text-muted-foreground">
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
                  disabledDates?.(day) ||
                  absences?.some((absence) => isSameDay(absence.date, day))
                )
                  return;
                setSelectedDay(day);
              }}
              className={cn(
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) && isToday(day) && "text-foreground",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-foreground",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-muted-foreground",
                isSameDay(day, selectedDay) && "bg-primary text-white",
                isEqual(day, selectedDay) && !isToday(day) && "bg-foreground",
                !isEqual(day, selectedDay) && "hover:bg-accent",
                (isEqual(day, selectedDay) || isToday(day)) && "font-medium",
                absences?.some((absence) => isSameDay(absence.date, day)) &&
                  "cursor-not-allowed opacity-50 hover:bg-transparent",
                disabledDates?.(day) &&
                  "cursor-not-allowed opacity-50 hover:bg-transparent",
                "mx-auto flex h-8 w-8 items-center justify-center rounded",
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
