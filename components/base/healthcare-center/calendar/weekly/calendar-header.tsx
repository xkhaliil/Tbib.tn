"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PanelRightOpenIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

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
  return (
    <header className="border-b p-4">
      <div className="-ms-2 mb-3 grid grid-cols-3 gap-2 lg:ms-0">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="smallIcon">
            <PanelRightOpenIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="outline" size="smallIcon">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex justify-center">
          <h1 className="inline-flex items-center justify-center gap-1 rounded-md border bg-white px-2 py-0.5 text-xs font-normal text-muted-foreground">
            Week
          </h1>
        </div>
        <div className="flex justify-end">
          <Button variant="blue" size="smallIcon">
            <PlusCircledIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-medium">
          {format(startOfWeek, "MMMM yyyy")}, Week {format(startOfWeek, "w")}
        </h2>
        <div className="flex -space-x-px rounded-md border bg-white">
          <Button variant="ghost" size="icon" onClick={previousWeek}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={nextWeek}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
