"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { format, startOfToday } from "date-fns";

import { useCreateAppointmentDialog } from "@/hooks/use-create-appointment-dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarButton } from "@/components/base/calendar/calendar-button";

interface CalendarHeaderProps {
  firstDayCurrentMonth: Date;
  nextMonth: () => void;
  goToToday: () => void;
  previousMonth: () => void;
}

export function CalendarHeader({
  nextMonth,
  goToToday,
  previousMonth,
}: CalendarHeaderProps) {
  const today = startOfToday();
  const { setOpen } = useCreateAppointmentDialog();
  return (
    <div className="flex items-center px-8 py-[14px]">
      <div className="flex flex-auto">
        <h2 className="text-lg font-semibold text-foreground">
          {format(today, "MMMM do, yyyy")}
        </h2>
      </div>

      <div className="flex items-center gap-x-6">
        <CalendarButton onClick={goToToday} label="Today">
          Today
        </CalendarButton>
        <div className="flex items-center gap-x-2">
          <CalendarButton
            onClick={previousMonth}
            label="Previous Month"
            className="h-9 w-9 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </CalendarButton>
          <CalendarButton
            onClick={nextMonth}
            label="Next Month"
            className="h-9 w-9 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </CalendarButton>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="blue" type="button" onClick={() => setOpen(true)}>
          <PlusCircledIcon className="h-4 w-4" />
          <span className="ml-2">New Appointment</span>
        </Button>
      </div>
    </div>
  );
}
