"use client";

import * as React from "react";

import Image from "next/image";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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

type HealthcareProvider = {
  id: string;
  name: string;
  email: string;
  image: string;
  speciality: string;
  totalConsultations: number;
  joinedAt: Date;
};

interface DataTableProps {
  columns: ColumnDef<HealthcareProvider, any>[];
  data: HealthcareProvider[];
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
      <CardHeader>
        <CardTitle>Team Members ({data.length})</CardTitle>
        <CardDescription>
          Invite, manage, and remove team members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Consultations
              </TableHead>
              <TableHead className="hidden md:table-cell">Joined At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.original.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Profile Image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell>{row.original.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.original.email}
                </TableCell>
                <TableCell>{row.original.speciality}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.original.totalConsultations}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(row.original.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="outline"
                      >
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
          <strong>{data.length}</strong> team members
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
