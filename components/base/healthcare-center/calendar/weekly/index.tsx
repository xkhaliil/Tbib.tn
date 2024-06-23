"use client";

import React from "react";

import { getHealthcareCenterAppointments } from "@/actions/healthcare-center";
import {
  Absence,
  Appointment,
  AppointmentStatus,
  HealthCareProvider,
  OpeningHours,
  Patient,
  User,
} from "@prisma/client";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import {
  add,
  addDays,
  addMinutes,
  eachDayOfInterval,
  endOfWeek,
  format,
  isAfter,
  parse,
  setHours,
  setMinutes,
  startOfDay,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { MapPinIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar as SmallCalendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { CalendarHeader } from "./calendar-header";
import { CalendarWeekDays } from "./calendar-week-days";

interface CalendarProps {
  appointments: Awaited<ReturnType<typeof getHealthcareCenterAppointments>>;
  absences?: Absence[];
  openingHours?: OpeningHours[];
}

export function Calendar({
  appointments,
  absences,
  openingHours,
}: CalendarProps) {
  const [showAll, setShowAll] = React.useState(true);
  const [hideAll, setHideAll] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [upcoming, setUpcoming] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);
  const [expired, setExpired] = React.useState(false);

  let today = startOfToday();
  let [startOfWeekState, setStartOfWeekState] = React.useState(
    startOfWeek(today),
  );

  let days = eachDayOfInterval({
    start: startOfWeekState,
    end: endOfWeek(startOfWeekState),
  });

  const start = setHours(setMinutes(startOfDay(new Date()), 30), 7);
  const end = setHours(setMinutes(startOfDay(addDays(new Date(), 1)), 0), 7);

  let times: string[] = [];
  let currentTime = start;

  while (!isAfter(currentTime, end)) {
    times.push(currentTime.toISOString());
    currentTime = addMinutes(currentTime, 30);
  }

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

  const filtredAppointments = appointments?.filter((appointment) => {
    if (showAll) {
      return true;
    }
    if (hideAll) {
      return false;
    }
    if (pending && appointment.status === AppointmentStatus.PENDING) {
      return true;
    }
    if (upcoming && appointment.status === AppointmentStatus.UPCOMING) {
      return true;
    }
    if (completed && appointment.status === AppointmentStatus.COMPLETED) {
      return true;
    }
    if (cancelled && appointment.status === AppointmentStatus.CANCELLED) {
      return true;
    }
    if (expired && appointment.status === AppointmentStatus.EXPIRED) {
      return true;
    }
    return false;
  });

  return (
    <>
      <div className="flex h-full">
        <aside className="fixed start-0 top-0 ml-14 hidden w-[18rem] border-e bg-muted/40 lg:bottom-0 lg:block">
          <div className="flex h-full max-h-full flex-col py-2">
            <SmallCalendar selectedDay={today} setSelectedDay={() => {}} />
            <Separator />
            <div className="px-4">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xs font-normal text-muted-foreground">
                    Status
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={showAll}
                        onCheckedChange={() => {
                          setShowAll(true);
                          setHideAll(false);
                          setPending(false);
                          setUpcoming(false);
                          setCompleted(false);
                          setCancelled(false);
                          setExpired(false);
                        }}
                      />
                      <span>Show all</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={hideAll}
                        onCheckedChange={() => {
                          setShowAll(false);
                          setHideAll(true);
                          setPending(false);
                          setUpcoming(false);
                          setCompleted(false);
                          setCancelled(false);
                          setExpired(false);
                        }}
                      />
                      <span>Hide all</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={pending}
                        onCheckedChange={() => {
                          setShowAll(false);
                          setHideAll(false);
                          setPending(!pending);
                        }}
                        className="border-[#A78025] data-[state=checked]:bg-[#A78025]"
                      />
                      <span>Pending</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={upcoming}
                        onCheckedChange={() => {
                          setShowAll(false);
                          setHideAll(false);
                          setUpcoming(!upcoming);
                        }}
                        className="border-teal-600 data-[state=checked]:bg-teal-600"
                      />
                      <span>Upcoming</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={completed}
                        onCheckedChange={() => {
                          setShowAll(false);
                          setHideAll(false);
                          setCompleted(!completed);
                        }}
                        className="border-sky-600 data-[state=checked]:bg-sky-600"
                      />
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={cancelled}
                        onCheckedChange={() => {
                          setShowAll(false);
                          setHideAll(false);
                          setCancelled(!cancelled);
                        }}
                        className="border-destructive data-[state=checked]:bg-destructive"
                      />
                      <span>Cancelled</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Checkbox
                        checked={expired}
                        onCheckedChange={() => {
                          setShowAll(false);
                          setHideAll(false);
                          setExpired(!expired);
                        }}
                        className="border-rose-400 data-[state=checked]:bg-rose-400"
                      />
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
        <div className="flex w-full flex-1 flex-col lg:ml-[21.5rem]">
          <div className="sticky left-0 right-0 top-0 z-10 border-b bg-white">
            <CalendarHeader
              startOfWeek={startOfWeekState}
              nextWeek={nextWeek}
              previousWeek={previousWeek}
              goToToday={goToToday}
            />
            <CalendarWeekDays startOfWeek={startOfWeekState} />
          </div>
          <div className="relative flex h-full w-full flex-col">
            <div className="-mt-px flex flex-auto">
              <div className="flex h-full flex-col border-e">
                {times.map((time, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-14 w-20 text-end",
                      format(
                        parse(time, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
                        "HH:mm",
                      ) === "07:30" && "opacity-0",
                    )}
                  >
                    <span className="relative -top-[13px] pe-4 text-xs text-muted-foreground">
                      {format(
                        parse(time, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
                        "HH:mm",
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative h-full w-full align-top">
                <div className="relative flex h-full overflow-hidden">
                  <div className="grid h-full w-full grid-cols-7">
                    {days.map((day, dayIdx) => (
                      <div key={dayIdx} className="border-r">
                        <div className="h-full w-full border-b">
                          {times.map((time, timeIdx) => (
                            <div key={timeIdx} className="h-14 border-b p-1.5">
                              {filtredAppointments?.map((appointment, idx) => {
                                const appointmentDate = new Date(
                                  appointment.date,
                                );
                                const appointmentTime = new Date(
                                  appointment?.startTime || "",
                                );
                                if (
                                  day.getDate() === appointmentDate.getDate() &&
                                  day.getMonth() ===
                                    appointmentDate.getMonth() &&
                                  day.getFullYear() ===
                                    appointmentDate.getFullYear() &&
                                  format(new Date(time), "HH:mm") ===
                                    format(appointmentTime, "HH:mm")
                                ) {
                                  return (
                                    <AppointmentButton
                                      key={idx}
                                      appointment={appointment}
                                    />
                                  );
                                }
                              })}
                            </div>
                          ))}
                        </div>
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

interface AppointmentButtonProps {
  appointment: Appointment & {
    healthCareProvider: HealthCareProvider & { user: User };
    patient: Patient & { user: User };
  };
}

function AppointmentButton({ appointment }: AppointmentButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-full w-full">
          <button
            type="button"
            className={cn(
              "relative flex h-full w-full items-center justify-between rounded-sm border-l-4 px-3 py-0.5 text-start text-xs",
              appointment.status === AppointmentStatus.PENDING &&
                "border-[#A78025] bg-[#FFE097]",
              appointment.status === AppointmentStatus.COMPLETED &&
                "border-sky-600 bg-sky-300",
              appointment.status === AppointmentStatus.UPCOMING &&
                "border-teal-600 bg-teal-400",
            )}
          >
            <span className="block truncate">
              <span className="font-semibold">
                {appointment?.patient.user.name}
              </span>
              <span className="block truncate">
                Dr. {appointment?.healthCareProvider.user.name}
              </span>
            </span>

            <Avatar className="h-6 w-6">
              <AvatarImage src={appointment?.patient.user.image || ""} />
              <AvatarFallback className="text-[10px]">
                {appointment?.patient.user.name[0]}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={appointment.healthCareProvider.user.image || ""}
                alt={appointment.healthCareProvider.user.name}
              />
              <AvatarFallback>
                {appointment.healthCareProvider.user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
              <h1 className="font-medium">
                {appointment.healthCareProvider.user.name}
              </h1>
              <div className="hidden text-xs text-muted-foreground md:inline">
                {appointment.healthCareProvider.speciality}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-y-1.5 py-1">
            <p className="pb-1 text-xs font-medium">
              This appointment is scheduled for :
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {format(appointment?.date!, "EEEE, MMMM dd, yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {format(appointment?.startTime!, "HH:mm a")} -&gt;{" "}
                  {format(appointment?.endTime!, "HH:mm a")}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                  {appointment?.healthCareProvider.officeAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
