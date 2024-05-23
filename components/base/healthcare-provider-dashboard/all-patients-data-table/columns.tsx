"use client";

import Image from "next/image";
import { getPatientById } from "@/actions/patient";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

type Patient = Awaited<ReturnType<typeof getPatientById>>;

const columnHelper = createColumnHelper<Patient>();

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
  columnHelper.accessor("user.gender", {
    id: "gender",
    header: "Gender",
  }),
  columnHelper.accessor("user.dateOfBirth", {
    id: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      {
        row.original?.user.dateOfBirth &&
          format(new Date(row.original.user.dateOfBirth), "dd/MM/yyyy");
      }
    },
  }),
  columnHelper.accessor("user.phone", {
    id: "phone",
    header: "Phone",
  }),
  columnHelper.accessor("user.city", {
    id: "address",
    header: "Address",
    cell: ({ row }) => {
      const city = row?.original?.user.city;
      const state = row?.original?.user.state;
      const zip = row?.original?.user.postalCode;
      return `${city}, ${state} ${zip}`;
    },
  }),
];
