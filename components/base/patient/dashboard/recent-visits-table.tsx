import React from "react";

import Image from "next/image";
import { Appointment, HealthCareProvider, User } from "@prisma/client";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentVisitsTableProps {
  visits: (Appointment & {
    healthCareProvider: HealthCareProvider & { user: User };
  })[];
}

export function RecentVisitsTable({ visits }: RecentVisitsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Healthcare Provider</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="hidden xl:table-cell">Time</TableHead>
          <TableHead className="hidden xl:table-cell">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visits.map((visit) => (
          <TableRow key={visit.id}>
            <TableCell>
              <div className="flex items-center space-x-4">
                <Image
                  alt="Profile Image"
                  className="aspect-square rounded-md object-cover"
                  src={
                    visit.healthCareProvider.user.image || "/placeholder.svg"
                  }
                  height="36"
                  width="36"
                />
                <div className="flex flex-col">
                  <h1 className="font-medium">
                    {visit.healthCareProvider.user.name}
                  </h1>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {visit.healthCareProvider.speciality}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(visit.date), "EE, MMMM dd, yyyy")}
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              {format(new Date(visit.startTime), "HH:mm a")} -{" "}
              {format(new Date(visit.endTime), "HH:mm a")}
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              <span className="rounded-sm bg-blue-300 px-2.5 py-1 text-xs font-medium text-blue-800">
                {visit.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
