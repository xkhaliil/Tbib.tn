"use client";

import Image from "next/image";
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

type HealthcareProvider = {
  id: string;
  name: string;
  email: string;
  image: string;
  speciality: string;
  requestedAt: Date;
};

const columnHelper = createColumnHelper<HealthcareProvider>();

export const columns = [
  columnHelper.accessor("image", {
    id: "image",
    header: "",
    cell: () => {
      return (
        <Image
          alt="Profile Image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src="/placeholder.svg"
          width="64"
        />
      );
    },
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
  }),
  columnHelper.accessor("speciality", {
    id: "speciality",
    header: "Speciality",
  }),
  columnHelper.accessor("requestedAt", {
    id: "requestedAt",
    header: "Request Sent At",
    cell: ({ row }) => {
      return format(row.original.requestedAt, "MM/dd/yyyy");
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
