"use client";

import React from "react";

import { createAbsence } from "@/actions/absence";
import {
  cancelAllAppointments,
  cancelAppointment,
} from "@/actions/appointment";
import { AppointmentWithPatient } from "@/types";
import { AppointmentStatus } from "@prisma/client";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface MarkAsAbsenceAlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  appointments?: AppointmentWithPatient[];
  date: Date;
}

export function MarkAsAbsenceAlertDialog({
  open,
  setOpen,
  appointments,
  date,
}: MarkAsAbsenceAlertDialogProps) {
  const [isPending, startTransition] = React.useTransition();

  async function handleCancelAppointment(appointmentId: string | undefined) {
    await cancelAppointment(appointmentId);
  }

  function handleCancelAllAppointments(ids: (string | undefined)[]) {
    startTransition(() => {
      cancelAllAppointments(ids).then(() => {
        setOpen(false);
        createAbsence({ date });
      });
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This day has{" "}
            <span className="font-semibold">{appointments?.length}</span>{" "}
            {appointments?.length === 1 ? "appointment" : "appointments"}{" "}
            scheduled. You can cancel all appointments and mark this day as an
            absence or reschedule each appointment individually.
          </AlertDialogDescription>
          <div className="pt-4">
            <ol className="space-y-2.5">
              {appointments
                ?.filter(
                  (appointment) =>
                    appointment?.status === AppointmentStatus.PENDING ||
                    appointment?.status === AppointmentStatus.CONFIRMED ||
                    appointment?.status === AppointmentStatus.UPCOMING,
                )
                .map((appointment) => (
                  <li
                    key={appointment?.id}
                    className="flex items-center justify-between gap-x-2.5 rounded-lg border px-3.5 py-2.5"
                  >
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
                          appointment?.status === AppointmentStatus.CONFIRMED &&
                            "bg-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "font-medium",
                            (appointment?.status ===
                              AppointmentStatus.CONFIRMED ||
                              appointment?.status ===
                                AppointmentStatus.CANCELLED) &&
                              "text-white",
                          )}
                        >
                          {appointment?.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <h1 className="text-sm font-semibold">
                          {appointment?.title}
                        </h1>
                        <p className="text-xs text-muted-foreground">
                          Patient: {appointment?.patient?.user.name} /{" "}
                          {format(appointment?.startTime!, "HH:mm")} -&gt;{" "}
                          {format(appointment?.endTime!, "HH:mm")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2.5">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment?.id)}
                      >
                        Cancel
                      </Button>
                      <Button size="sm">Reschedule</Button>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Close
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              handleCancelAllAppointments(
                appointments?.map((appointment) => appointment?.id) || [],
              )
            }
            disabled={isPending}
          >
            {isPending ? <Spinner className="mr-2" /> : null}{" "}
            <span>
              {isPending ? "Cancelling appointments..." : "Cancel all"}
            </span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
