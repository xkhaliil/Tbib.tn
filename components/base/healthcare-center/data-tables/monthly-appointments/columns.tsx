"use client";

import Image from "next/image";
import { fetchTodayAppointments } from "@/actions/appointment";
import {
  AppointmentStatus,
  HealthCareProvider,
  Patient,
  User,
} from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TodayAppointment = {
  id: string;
  patient: Patient & {
    user: User;
  };
  healthCareProvider: HealthCareProvider & {
    user: User;
  };
  date: Date;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
};

const columnHelper = createColumnHelper<TodayAppointment>();

export const columns = [
  columnHelper.accessor("patient", {
    id: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return (
        <>
          <div className="font-medium">{row.original?.patient.user.name}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {row.original?.patient.user.email}
          </div>
        </>
      );
    },
  }),
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="outline">
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
