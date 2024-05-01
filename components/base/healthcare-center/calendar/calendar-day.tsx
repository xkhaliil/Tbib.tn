"use client";

import { format, getDay, isEqual, isSameMonth, isToday } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DayProps {
  day: Date;
  selectedDay: Date;
  firstDayCurrentMonth: Date;
  dayIndex: number;
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function CalendarDay({
  day,
  selectedDay,
  firstDayCurrentMonth,
  dayIndex,
}: DayProps) {
  return (
    <div
      className={cn(
        dayIndex === 0 && colStartClasses[getDay(day)],
        !isEqual(day, selectedDay) &&
          !isToday(day) &&
          !isSameMonth(day, firstDayCurrentMonth) &&
          "bg-accent/50 text-muted-foreground",
        "relative flex flex-col border-b border-r",
        !isEqual(day, selectedDay) && "hover:bg-accent/75",
      )}
    >
      <Button
        variant="outline"
        size="smallIcon"
        className={cn(
          "absolute right-2.5 top-2.5 rounded-full text-xs",
          isEqual(day, selectedDay) && "text-white",
          isEqual(day, selectedDay) &&
            isToday(day) &&
            "border-none bg-blue-600 hover:bg-blue-600 hover:text-white",
        )}
      >
        <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
      </Button>
      {/* <div className="mt-10 w-full flex-1 p-2.5">
        <button
          type="button"
          className="relative w-full rounded border-s-4 border-orange-600 bg-orange-100 px-2 py-1 text-start"
        >
          <span className="block truncate text-xs">
            <span className="block truncate font-semibold text-orange-800">
              Dr. Jane Doe, MD
            </span>
            <span className="block truncate">10:00 AM - 11:00 AM</span>
          </span>
        </button>
      </div> */}
    </div>
  );
}
