"use client";

import React from "react";

import { AppointmentWithPatient } from "@/types";
import { Absence } from "@prisma/client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";

import { CalendarDay } from "@/components/base/calendar/calendar-day";
import { CalendarHeader } from "@/components/base/calendar/calendar-header";
import { CalendarWeekDays } from "@/components/base/calendar/calendar-week-days";
import { Sidebar } from "@/components/base/navigation/sidebar";

interface CalendarProps {
  appointments: AppointmentWithPatient[];
  absences?: Absence[];
}

export function Calendar({ appointments, absences }: CalendarProps) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = React.useState(today);
  let [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"));
  }

  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <CalendarHeader
            firstDayCurrentMonth={firstDayCurrentMonth}
            nextMonth={nextMonth}
            previousMonth={previousMonth}
            goToToday={goToToday}
          />
          <div className="flex w-full flex-1 flex-col">
            <CalendarWeekDays />
            <div className="grid flex-1 grid-cols-7 grid-rows-2 md:grid-rows-5">
              {days.map((day, dayIdx) => (
                <CalendarDay
                  key={dayIdx}
                  day={day}
                  selectedDay={selectedDay}
                  firstDayCurrentMonth={firstDayCurrentMonth}
                  dayIndex={dayIdx}
                  appointments={appointments}
                  absences={absences}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
