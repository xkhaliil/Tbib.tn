"use client";

import React from "react";

import { createAbsence, deleteAbsence } from "@/actions/absence";
import { CreateAbsenceSchemaType } from "@/schemas";
import { AppointmentWithPatient } from "@/types";
import { Absence, AppointmentStatus, OpeningHours } from "@prisma/client";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import {
  format,
  getDay,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  startOfToday,
} from "date-fns";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditAppointementDialog } from "@/components/dialogs/edit-appointment-dialog";
import { MarkAsAbsenceAlertDialog } from "@/components/dialogs/mark-as-absence-alert-dialog";

interface DayProps {
  day: Date;
  selectedDay: Date;
  firstDayCurrentMonth: Date;
  dayIndex: number;
  appointments: AppointmentWithPatient[];
  absences?: Absence[];
  openingHours?: OpeningHours[];
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function CalendarDay({
  day,
  selectedDay,
  firstDayCurrentMonth,
  dayIndex,
  appointments,
  absences,
  openingHours,
}: DayProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [appointmentsByAbsence, setAppointmentsByAbsence] = React.useState<
    AppointmentWithPatient[]
  >([]);

  async function handleMarkAsAbsence(values: CreateAbsenceSchemaType) {
    await createAbsence(values).then((response) => {
      if (response?.exists && response?.appointments) {
        setOpen(true);
        setAppointmentsByAbsence(response.appointments);
      }
    });
  }

  async function handleDeleteAbsence(date: Date) {
    await deleteAbsence(date);
  }

  return (
    <div
      className={cn(
        dayIndex === 0 && colStartClasses[getDay(day)],
        !isEqual(day, selectedDay) &&
          !isToday(day) &&
          !isSameMonth(day, firstDayCurrentMonth) &&
          "bg-accent/50 text-muted-foreground",
        "relative flex flex-col border-b border-r",
        !isEqual(day, selectedDay) && "hover:bg-accent/75",
        absences?.some((absence) => isSameDay(absence.date, day)) &&
          "cursor-not-allowed bg-[url('/images/pattern.png')] bg-cover",
        // If the day index is equals to an opening hour day index and its closed day
        openingHours?.some(
          (openingHour) =>
            openingHour.dayOfWeek === dayIndex && openingHour.isClosed,
        ) && "cursor-not-allowed bg-rose-100 hover:bg-rose-100",
      )}
    >
      <header className="flex items-center justify-between p-3.5">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            disabled={
              isBefore(day, startOfToday()) ||
              openingHours?.some(
                (openingHour) =>
                  openingHour.dayOfWeek === dayIndex && openingHour.isClosed,
              )
            }
          >
            <button
              type="button"
              className={cn(
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) && isToday(day) && "text-red-500",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-foreground",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-muted-foreground",
                isEqual(day, selectedDay) &&
                  isToday(day) &&
                  "border-none bg-primary data-[state=open]:bg-primary",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  "data-[state=open]:bg-muted",
                isEqual(day, selectedDay) && !isToday(day) && "bg-foreground",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border",
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel className="text-xs">
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d MMMM yyyy")}
              </time>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {absences?.some((absence) => isSameDay(absence.date, day)) ? (
                <DropdownMenuItem
                  className="text-xs"
                  onClick={() => handleDeleteAbsence(day)}
                >
                  Remove Absence
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-xs"
                  onClick={() => handleMarkAsAbsence({ date: day })}
                >
                  Mark as absence
                </DropdownMenuItem>
              )}
              {!absences?.some((absence) => isSameDay(absence.date, day)) && (
                <DropdownMenuItem className="text-xs">
                  Add Appointment
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex-1">
        <div className="space-y-2.5 p-3">
          {appointments
            .filter((appointment) => isSameDay(appointment?.date!, day))
            .map((appointment) => (
              <AppointmentPopover
                key={appointment?.id}
                appointment={appointment}
                absences={absences}
              >
                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg px-4 py-1.5 text-xs",
                    appointment?.status === AppointmentStatus.PENDING &&
                      "bg-warning text-warning-foreground",
                    appointment?.status === AppointmentStatus.UPCOMING &&
                      "bg-success text-success-foreground",
                    appointment?.status === AppointmentStatus.COMPLETED &&
                      "bg-info text-info-foreground",
                    appointment?.status === AppointmentStatus.EXPIRED &&
                      "bg-rose-500/35",
                    appointment?.status === AppointmentStatus.CANCELLED &&
                      "bg-destructive text-destructive-foreground",
                    appointment?.status === AppointmentStatus.CONFIRMED &&
                      "bg-primary text-primary-foreground",
                  )}
                >
                  <p className="truncate font-medium">{appointment?.title}</p>
                  <div className="flex items-center gap-x-2 text-xs">
                    <span>
                      {format(appointment?.startTime!, "H:mm")} -{" "}
                      {format(appointment?.endTime!, "H:mm")}
                    </span>
                    {appointment?.status === AppointmentStatus.PENDING && (
                      <QuestionMarkCircledIcon className="h-3 w-3" />
                    )}
                    {appointment?.status === AppointmentStatus.COMPLETED && (
                      <CheckCircledIcon className="h-3 w-3" />
                    )}
                    {appointment?.status === AppointmentStatus.UPCOMING && (
                      <StopwatchIcon className="h-3 w-3" />
                    )}
                    {appointment?.status === AppointmentStatus.CANCELLED && (
                      <CrossCircledIcon className="h-3 w-3" />
                    )}
                    {appointment?.status === AppointmentStatus.CONFIRMED && (
                      <ArrowRightIcon className="h-3 w-3" />
                    )}
                  </div>
                </div>
              </AppointmentPopover>
            ))}
          {openingHours?.some(
            (openingHour) =>
              openingHour.dayOfWeek === dayIndex && openingHour.isClosed,
          ) && (
            <div className="flex items-center justify-center text-xs font-medium text-rose-500">
              Closed
            </div>
          )}
        </div>
      </div>

      <MarkAsAbsenceAlertDialog
        open={open}
        setOpen={setOpen}
        appointments={appointmentsByAbsence}
        date={day}
      />
    </div>
  );
}

interface AppointmentPopoverProps {
  appointment: AppointmentWithPatient;
  children?: React.ReactNode;
  absences?: Absence[];
}

function AppointmentPopover({
  appointment,
  children,
  absences,
}: AppointmentPopoverProps) {
  const [editAppointmentDialogOpen, setEditAppointmentDialogOpen] =
    React.useState<boolean>(false);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent align="start" className="w-80">
          <div className="flex items-center gap-x-2.5">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded",
                appointment?.status === AppointmentStatus.PENDING &&
                  "bg-warning",
                appointment?.status === AppointmentStatus.UPCOMING &&
                  "bg-success",
                appointment?.status === AppointmentStatus.COMPLETED &&
                  "bg-info",
                appointment?.status === AppointmentStatus.CANCELLED &&
                  "bg-destructive",
                appointment?.status === AppointmentStatus.EXPIRED &&
                  "bg-rose-500/35",
                appointment?.status === AppointmentStatus.CONFIRMED &&
                  "bg-primary",
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  (appointment?.status === AppointmentStatus.CONFIRMED ||
                    appointment?.status === AppointmentStatus.CANCELLED) &&
                    "text-white",
                )}
              >
                {appointment?.title.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">{appointment?.title}</h1>
              <p className="text-xs text-muted-foreground">
                {format(appointment?.startTime!, "HH:mm a")} -&gt;{" "}
                {format(appointment?.endTime!, "HH:mm a")}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs font-medium">
              This appointment is scheduled for :
            </p>
            <div className="flex items-center gap-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {format(appointment?.date!, "EE, MMMM dd,")} from{" "}
                {format(appointment?.startTime!, "HH:mm")} to{" "}
                {format(appointment?.endTime!, "HH:mm")}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted-foreground">
              {appointment?.description}
            </p>
          </div>

          {(appointment?.status === AppointmentStatus.PENDING ||
            appointment?.status === AppointmentStatus.UPCOMING) && (
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setEditAppointmentDialogOpen(true)}
              >
                Resechedule Appointment
              </Button>
              <Button variant="destructive" size="sm" className="mt-2 w-full">
                Cancel Appointment
              </Button>
            </div>
          )}

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-x-2.5">
              <Avatar className="h-8 w-8">
                {appointment?.patient.user.image && (
                  <AvatarImage
                    src={appointment?.patient.user.image}
                    alt={appointment?.patient.user.name}
                  />
                )}
                <AvatarFallback>
                  {appointment?.patient.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-xs">
                <p className="font-medium">{appointment?.patient.user.name}</p>
                <p className="text-muted-foreground">
                  {appointment?.patient.user.email}
                </p>
              </div>
            </div>

            <Button variant="outline" size="smallIcon">
              <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <EditAppointementDialog
        appointment={appointment}
        open={editAppointmentDialogOpen}
        setOpen={setEditAppointmentDialogOpen}
        absences={absences}
      />
    </>
  );
}
