"use client";

import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar as SmallCalendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { CalendarDay } from "./calendar-day";
import { CalendarHeader } from "./calendar-header";
import { CalendarWeekDays } from "./calendar-week-days";

export function Calendar() {
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
      <aside className="fixed start-0 top-0 ml-14 hidden w-[18rem] border-e bg-muted/40 lg:bottom-0 lg:block">
        <div className="flex h-full max-h-full flex-col py-2">
          <SmallCalendar selectedDay={selectedDay} setSelectedDay={() => {}} />
          <Separator />
          <div className="px-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xs font-normal text-muted-foreground">
                  Status
                </AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox />
                    <span>Show all</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox />
                    <span>Hide all</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox className="border-orange-600 data-[state=checked]:bg-orange-600" />
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox className="border-green-600 data-[state=checked]:bg-green-600" />
                    <span>Upcoming</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox className="border-blue-400 data-[state=checked]:bg-blue-400" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox className="border-destructive data-[state=checked]:bg-destructive" />
                    <span>Cancelled</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Checkbox className="border-rose-400 data-[state=checked]:bg-rose-400" />
                    <span>Expired</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Separator />
          <div className="mt-4 px-4">
            <Button variant="white" size="sm" className="w-full">
              <PlusIcon className="h-4 w-4" />
              <span className="ml-2">Invite a new healthcare provider</span>
            </Button>
          </div>
        </div>
      </aside>
      <main className="ml-0 md:ml-14 lg:ml-[21.5rem]">
        <CalendarHeader
          nextMonth={nextMonth}
          goToToday={goToToday}
          previousMonth={previousMonth}
        />
        <div className="flex h-[calc(100dvh-110px)] flex-col">
          <CalendarWeekDays />
          <div className="grid flex-1 grid-cols-7 grid-rows-2 md:grid-rows-5">
            {days.map((day, dayIdx) => (
              <CalendarDay
                key={dayIdx}
                day={day}
                selectedDay={selectedDay}
                firstDayCurrentMonth={firstDayCurrentMonth}
                dayIndex={dayIdx}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
