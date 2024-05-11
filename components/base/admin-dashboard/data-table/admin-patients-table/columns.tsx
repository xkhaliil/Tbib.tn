"use client";

import Image from "next/image";
import { getAllPatients } from "@/actions/patient";
import { Patient, User } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PatientType = Patient & {
  user: User;
};

const columnHelper = createColumnHelper<PatientType>();

export const columns = [
  columnHelper.accessor("user.name", {
    header: "Name",
    id: "name",
    cell: ({ row }) => {
      const email = row?.original?.user?.email;
      return (
        <div className="flex items-center space-x-4">
          <Image
            alt="Profile Image"
            className="aspect-square rounded-md object-cover"
            src={row?.original?.user?.image ?? "/placeholder.svg"}
            height="36"
            width="36"
          />
          <div className="flex flex-col">
            <h1 className="font-medium">{row.getValue("name")}</h1>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {email}
            </div>
          </div>
        </div>
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
