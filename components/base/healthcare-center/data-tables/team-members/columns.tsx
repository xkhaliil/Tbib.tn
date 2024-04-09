"use client";

import Image from "next/image";
import { getHealthcareProviderByHealthcareCenterId } from "@/actions/healthcare-center";
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

type HealthcareProvider = Awaited<
  ReturnType<typeof getHealthcareProviderByHealthcareCenterId>
>;

const columnHelper = createColumnHelper<HealthcareProvider>();

export const columns = [
  columnHelper.accessor("user.image", {
    id: "image",
    header: "",
    cell: ({ row }) => {
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
  columnHelper.accessor("user.name", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("user.email", {
    id: "email",
    header: "Email",
  }),
  columnHelper.accessor("speciality", {
    id: "speciality",
    header: "Speciality",
  }),
  columnHelper.accessor("user.createdAt", {
    id: "joinedAt",
    header: "Joined At",
    cell: ({ row }) => {
      {
        row.original?.user.createdAt &&
          format(new Date(row.original.user.createdAt), "dd/MM/yyyy");
      }
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
