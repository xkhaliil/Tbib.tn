import React from "react";

import { fetchTodayAppointments } from "@/actions/appointment";
import { AppointmentStatus } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TodayAppointmentsTableProps {
  appointments: Awaited<ReturnType<typeof fetchTodayAppointments>>;
}

export function TodayAppointmentsTable({
  appointments,
}: TodayAppointmentsTableProps) {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Today's Appointments</CardTitle>
        <CardDescription>
          View today's appointments and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden sm:table-cell">From</TableHead>
              <TableHead className="hidden sm:table-cell">To</TableHead>
              <TableHead>Healthcare Provider</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}

            {appointments?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="font-medium">
                    {appointment.patient.user.name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {appointment.patient.user.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {format(new Date(appointment.startTime), "HH:mm")}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {format(new Date(appointment.endTime), "HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {appointment.healthCareProvider.user.name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {appointment.healthCareProvider.speciality}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={cn(
                      "rounded-sm px-2.5 py-1 text-xs font-medium",
                      appointment.status === AppointmentStatus.PENDING &&
                        "bg-yellow-100 text-yellow-600",
                      appointment.status === AppointmentStatus.CONFIRMED &&
                        "bg-green-100 text-green-600",
                      appointment.status === AppointmentStatus.CANCELLED &&
                        "bg-rose-100 text-rose-600",
                      appointment.status === AppointmentStatus.COMPLETED &&
                        "bg-blue-100 text-blue-600",
                    )}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Button size="icon" variant="outline">
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
