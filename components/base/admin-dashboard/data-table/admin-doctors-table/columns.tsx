"use client";

import { getAllDoctors, getDoctorById } from "@/actions/doctors";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Doctor = Awaited<ReturnType<typeof getAllDoctors>>;
const columnHelper = createColumnHelper<Doctor>();
export const columns = [
  columnHelper.accessor("user.name", {
    header: "Name",
    id: "name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  }),
  columnHelper.accessor("speciality", {
    id: "speciality",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speciality
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("accountVerified", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.getValue("accountVerified") ? "success" : "destructive"}
        >
          {row.getValue("accountVerified") ? "Verified" : "Not Verified"}
        </Badge>
      );
    },
  }),

  {
    id: "actions",
    cell: () => (
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit </DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>{" "}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
