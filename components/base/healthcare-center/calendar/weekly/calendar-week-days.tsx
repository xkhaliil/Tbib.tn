import React from "react";

import { format, getDay } from "date-fns";

import { cn } from "@/lib/utils";

interface CalendarWeekDaysProps {
  startOfWeek: Date;
}

export function CalendarWeekDays({ startOfWeek }: CalendarWeekDaysProps) {
  return (
    <>
      <div className="border-b">
        <div className="flex flex-auto border-e">
          <div className="flex h-full flex-col border-e">
            <div className="flex h-10 w-20 items-center justify-end text-end">
              <span className="pe-4 text-xs text-muted-foreground">
                {format(startOfWeek, "yyyy")}
              </span>
            </div>
          </div>
          <div className="grid w-full grid-cols-7 text-center text-xs font-medium leading-6 text-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer px-3 py-2 font-normal transition-colors hover:bg-accent",
                    getDay(new Date()) === index &&
                      "border-b-2 border-blue-600 text-blue-600",
                  )}
                >
                  {day}
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-auto">
        <div className="flex h-full flex-col border-e">
          <div className="flex h-10 w-20 items-center justify-end text-end">
            <span className="pe-4 text-xs text-muted-foreground">All day</span>
          </div>
        </div>

        <div className="grid w-full grid-cols-7 text-center text-xs font-medium leading-6 text-foreground">
          <div className="border-r px-3 py-2"></div>
          <div className="border-r px-3 py-2"></div>
          <div className="border-r px-3 py-2"></div>
          <div className="border-r px-3 py-2"></div>
          <div className="border-r px-3 py-2"></div>
          <div className="border-r px-3 py-2"></div>
          <div className="border-r px-3 py-2"></div>
        </div>
      </div>
    </>
  );
}
