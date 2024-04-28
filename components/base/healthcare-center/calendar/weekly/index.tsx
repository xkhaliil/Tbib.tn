"use client";

import React from "react";

import { AppointmentWithPatient } from "@/types";
import { Absence, OpeningHours } from "@prisma/client";
import {
  add,
  eachDayOfInterval,
  endOfWeek,
  format,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";

import { cn } from "@/lib/utils";

import { CalendarDay } from "./calendar-day";
import { CalendarHeader } from "./calendar-header";

interface CalendarProps {
  appointments: AppointmentWithPatient[];
  absences?: Absence[];
  openingHours?: OpeningHours[];
}

export function Calendar({
  appointments,
  absences,
  openingHours,
}: CalendarProps) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = React.useState(today);
  let [startOfWeekState, setStartOfWeekState] = React.useState(
    startOfWeek(today),
  );

  let days = eachDayOfInterval({
    start: startOfWeekState,
    end: endOfWeek(startOfWeekState),
  });

  const timeColumn = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  function previousWeek() {
    setStartOfWeekState((prevStartOfWeek) =>
      add(prevStartOfWeek, { weeks: -1 }),
    );
  }

  function nextWeek() {
    setStartOfWeekState((prevStartOfWeek) =>
      add(prevStartOfWeek, { weeks: 1 }),
    );
  }

  function goToToday() {
    setStartOfWeekState(startOfWeek(today));
  }

  return (
    <>
      <div className="flex h-full">
        <div className="ml-14 w-full">
          <CalendarHeader
            startOfWeek={startOfWeekState}
            nextWeek={nextWeek}
            previousWeek={previousWeek}
            goToToday={goToToday}
          />
          <div className="relative flex h-full w-full flex-col">
            <div className="-mt-px flex flex-auto">
              <div className="flex h-full flex-col border-e">
                {timeColumn.map((time, index) => (
                  <div key={index} className="h-14 w-20 text-end">
                    <span
                      className={cn(
                        "relative -top-3 pe-4 text-xs text-muted-foreground",
                        time === "12:00 AM" && "opacity-0",
                      )}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative h-full w-full align-top">
                <div className="relative flex h-full overflow-hidden">
                  <div className="grid h-full w-full grid-cols-7">
                    {days.map((day, dayIdx) => (
                      <div key={dayIdx} className="flex flex-auto flex-col">
                        {timeColumn.map((time, index) => (
                          <div
                            key={index}
                            className="relative flex h-14 flex-1 border-b border-e"
                          >
                            <div className="w-full"></div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
