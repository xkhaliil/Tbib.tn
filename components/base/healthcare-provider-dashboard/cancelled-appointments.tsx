import React from "react";

import { AppointmentsWithPatient } from "@/types";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AppointmentActions } from "./appointment-actions";

interface CancelledAppointmentsProps {
  appointments: AppointmentsWithPatient | undefined;
}

export function CancelledAppointments({
  appointments,
}: CancelledAppointmentsProps) {
  return (
    <>
      {appointments?.length ? (
        appointments?.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center border-b border-l-[6px] border-l-destructive p-4"
          >
            <div className="flex space-x-3">
              <Avatar className="h-9 w-9">
                {appointment.patient.user.image && (
                  <AvatarImage
                    src={appointment.patient.user.image}
                    alt={appointment.patient.user.name}
                  />
                )}
                <AvatarFallback>
                  {appointment.patient.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {appointment.title}
                  </p>
                  <p className="max-w-[14rem] truncate text-xs font-normal text-muted-foreground">
                    {appointment.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(appointment.date, "do MMMM, yyyy")}
                  </p>
                </div>

                <div className="mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {format(appointment.startTime, "HH:mm")} -&gt;{" "}
                      {format(appointment.endTime, "HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex border-b p-4">
          <p className="text-xs text-muted-foreground">
            No cancelled appointments found.
          </p>
        </div>
      )}
    </>
  );
}
