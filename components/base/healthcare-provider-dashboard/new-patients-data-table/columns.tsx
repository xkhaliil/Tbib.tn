"use client";

import { Patient } from "@/types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { createColumnHelper } from "@tanstack/react-table";
import { differenceInYears, format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const columnHelper = createColumnHelper<Patient>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("user.name", {
    id: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  }),
  columnHelper.accessor("user.dateOfBirth", {
    header: "Age",
    cell: ({ row }) => {
      const dateOfBirth = row.original?.user.dateOfBirth;
      return (
        <div>
          {dateOfBirth
            ? differenceInYears(new Date(), new Date(dateOfBirth)) + " years"
            : "N/A"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("user.gender", {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original?.user.gender;
      return (
        <div>
          {/** @ts-ignore */}
          {gender?.charAt(0).toUpperCase() + gender?.slice(1).toLowerCase() ??
            "N/A"}
        </div>
      );
    },
  }),
  columnHelper.accessor((patient) => patient?.appointments[0].date, {
    header: "Date",
    cell: (row) => {
      return <div>{format(row.renderValue()!, "MMM d, yyyy")}</div>;
    },
  }),
  columnHelper.accessor((patient) => patient?.appointments[0].title, {
    header: "Appointed for",
    cell: (row) => (
      <div className="w-[160px]">
        <Badge variant="white">{row.renderValue()}</Badge>
      </div>
    ),
  }),
  {
    id: "actions",
    cell: () => (
      <Button size="icon" variant="ghost">
        <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    ),
  },
];
