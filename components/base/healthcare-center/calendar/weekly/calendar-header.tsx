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
  startOfWeek: Date;
  nextWeek: () => void;
  previousWeek: () => void;
  goToToday: () => void;
}

export function CalendarHeader({
  startOfWeek,
  nextWeek,
  previousWeek,
  goToToday,
}: CalendarHeaderProps) {
  const today = startOfToday();
  const { setOpen } = useCreateAppointmentDialog();
  return (
    <div className="sticky left-0 right-0 top-0 z-40 border-b bg-white">
      <div className="border-b">
        <div className="flex flex-auto border-e">
          <div className="flex h-full flex-col border-e">
            <div className="flex h-10 w-20 items-center justify-end text-end">
              <span className="pe-4 text-xs text-muted-foreground">
                {format(startOfWeek, "MMM yyyy")}
              </span>
            </div>
          </div>
          <div className="grid w-full grid-cols-7 text-center text-xs font-medium leading-6 text-foreground">
            <div className="border-r px-3 py-2">Sun</div>
            <div className="border-r px-3 py-2">Mon</div>
            <div className="border-r px-3 py-2">Tue</div>
            <div className="border-r px-3 py-2">Wed</div>
            <div className="border-r px-3 py-2">Thu</div>
            <div className="border-r px-3 py-2">Fri</div>
            <div className="px-3 py-2">Sat</div>
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
    </div>
  );
}
