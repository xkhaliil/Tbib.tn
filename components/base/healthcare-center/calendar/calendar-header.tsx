"use client";

import React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PanelRightOpenIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  nextMonth: () => void;
  goToToday: () => void;
  previousMonth: () => void;
}

export function CalendarHeader({
  nextMonth,
  goToToday,
  previousMonth,
}: CalendarHeaderProps) {
  return (
    <header className="p-4">
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
          <h1 className="inline-flex items-center justify-center gap-1 rounded-md border bg-white px-1.5 py-0.5 text-xs font-medium">
            {format(new Date(), "MMMM yyyy")}
          </h1>
        </div>
        <div className="flex justify-end">
          <Button variant="blue" size="smallIcon">
            <PlusCircledIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-medium">
          {format(new Date(), "EEEE, MMMM d yyyy")}
        </h2>
        <div className="flex -space-x-px rounded-md border bg-white">
          <Button variant="ghost" size="icon" onClick={previousMonth}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
