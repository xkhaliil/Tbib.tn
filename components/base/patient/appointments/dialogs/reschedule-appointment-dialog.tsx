"use client";

import React from "react";

import { getHealthCareProviderById } from "@/actions/healthcare-provider";
import {
  RescheduleAppointmentSchema,
  RescheduleAppointmentSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appointment } from "@prisma/client";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameDay,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RescheduleAppointmentDialogProps {
  appointment: Appointment;
  healthcareProvider: Awaited<ReturnType<typeof getHealthCareProviderById>>;
  timeSlots: Date[];
}

export function RescheduleAppointmentDialog({
  appointment,
  healthcareProvider,
  timeSlots,
}: RescheduleAppointmentDialogProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  );
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

  const getIndexesOfClosedDays = () => {
    return healthcareProvider?.openingHours
      ?.filter((openingHour) => openingHour.isClosed)
      .map((openingHour) => openingHour.dayOfWeek);
  };

  const closedDays: number[] = [];

  for (let i = 0; i <= getIndexesOfClosedDays()?.length! ?? 0; i++) {
    const array = [
      getIndexesOfClosedDays()?.[i] ?? 0,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 7,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 14,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 21,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 28,
      (getIndexesOfClosedDays()?.[i] ?? 0) + 35,
    ];

    closedDays.push(...array);
  }

  const isClosed = (dayIndex: number) => {
    return closedDays.includes(dayIndex);
  };

  const rescheduleAppointmentForm = useForm<RescheduleAppointmentSchemaType>({
    resolver: zodResolver(RescheduleAppointmentSchema),
    defaultValues: {
      date: appointment.date,
      time: appointment.startTime,
    },
  });

  const selectedDay = rescheduleAppointmentForm.watch("date");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="warning">Reschedule</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-6xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold leading-none tracking-tight">
              Reschedule Appointment
            </h1>
            <Badge variant="white" className="uppercase">
              # {appointment.id}
            </Badge>
          </div>
        </DialogHeader>

        <Form {...rescheduleAppointmentForm}>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-[400px_1fr]">
            <div className="flex flex-col p-4">
              <div className="mb-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="smallIcon"
                  onClick={previousMonth}
                >
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
                <h2 className="text-sm font-medium text-foreground">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <Button variant="outline" size="smallIcon" onClick={nextMonth}>
                  <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-7 text-center text-xs leading-6 text-muted-foreground">
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
                          healthcareProvider?.absences?.some((absence) =>
                            isSameDay(absence.date, day),
                          ) ||
                          isClosed(dayIdx) ||
                          isBefore(day, startOfToday())
                        )
                          return;
                        rescheduleAppointmentForm.setValue("date", day);
                      }}
                      className={cn(
                        isSameDay(day, selectedDay) && "bg-blue-600 text-white",
                        healthcareProvider?.absences?.some((absence) =>
                          isSameDay(absence.date, day),
                        ) &&
                          "cursor-not-allowed bg-[url('/images/pattern.png')] bg-cover",
                        isClosed(dayIdx) &&
                          "cursor-not-allowed bg-rose-400 text-white hover:bg-rose-400",
                        isBefore(day, startOfToday()) &&
                          "cursor-not-allowed opacity-50",
                        "mx-auto flex h-9 w-9 items-center justify-center rounded",
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

            <FormField
              control={rescheduleAppointmentForm.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-1 pt-4">
                  <FormLabel>Appointment Time</FormLabel>
                  <FormDescription>
                    Select the time for your appointment.
                  </FormDescription>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-8 gap-4 pt-4"
                  >
                    {timeSlots.map((time) => (
                      <FormItem key={time.toString()}>
                        <FormLabel className="ring-offset-2 ring-offset-blue-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              value={time.toString()}
                              className="sr-only"
                              disabled={isEqual(
                                time,
                                new Date(appointment.startTime),
                              )}
                            />
                          </FormControl>
                          <Card
                            key={time.toString()}
                            className={cn(
                              "w-full cursor-pointer",
                              isEqual(time, appointment.startTime) &&
                                "cursor-not-allowed bg-blue-600 text-white",
                            )}
                          >
                            <CardContent className="flex items-center justify-between px-4 py-2.5 text-sm">
                              {format(time, "HH:mm")}
                              {isEqual(time, appointment.startTime) && (
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                                  <CheckIcon className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                  <FormMessage className="pt-4" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
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
