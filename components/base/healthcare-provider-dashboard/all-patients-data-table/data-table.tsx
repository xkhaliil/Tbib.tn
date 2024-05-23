"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { getPatientById } from "@/actions/patient";
import { DotsHorizontalIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps {
  columns: ColumnDef<Awaited<ReturnType<typeof getPatientById>>, any>[];
  data: Awaited<ReturnType<typeof getPatientById>>[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card>
      <DataTableToolbar table={table} />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">
                Date of Birth
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.original?.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Profile Image"
                    className="aspect-square h-12 w-12 rounded-md object-cover"
                    height="64"
                    src={row.original?.user.image || "/placeholder.svg"}
                    width="64"
                  />
                </TableCell>
                <TableCell>{row.original?.user.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.original?.user.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.original?.user.gender === "MALE" ? "Male" : "Female"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(
                    new Date(row.original?.user.dateOfBirth || new Date()),
                    "dd/MM/yyyy",
                  )}
                </TableCell>
                <TableCell>(+216) {row.original?.user.phone}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.original?.user.city}, {row.original?.user.state}{" "}
                  {row.original?.user.postalCode}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/hp/dashboard/patients/patient/${row.original?.id}`}
                    >
                      <EyeOpenIcon className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-7">
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            {table.getRowModel().rows.length > 0}
            {table.getRowModel().rows.length > 0 ? "1-" : ""}
            {table.getRowModel().rows.length}{" "}
            <span className="font-normal">of</span>{" "}
          </strong>
          <strong>{data.length}</strong> patients
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
