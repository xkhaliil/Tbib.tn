"use client";

import * as React from "react";

import {
  AppointmentStatus,
  HealthCareProvider,
  Patient,
  User,
} from "@prisma/client";
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
import { format } from "date-fns";

import { cn } from "@/lib/utils";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TodayAppointment = {
  id: string;
  patient: Patient & {
    user: User;
  };
  healthCareProvider: HealthCareProvider & {
    user: User;
  };
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
};

interface DataTableProps {
  columns: ColumnDef<TodayAppointment, any>[];
  data: TodayAppointment[];
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
    <Card className="mt-2">
      <CardHeader className="px-7">
        <CardTitle>This Week&apos;s Appointments</CardTitle>
        <CardDescription>
          View all the appointments scheduled for this week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden sm:table-cell">From</TableHead>
              <TableHead className="hidden sm:table-cell">To</TableHead>
              <TableHead>Healthcare Provider</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="p-8 text-center text-muted-foreground"
                >
                  No appointments for this week.
                </TableCell>
              </TableRow>
            )}

            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="font-medium">
                    {row.original?.patient.user.name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {row.original?.patient.user.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {format(new Date(row.original?.startTime), "HH:mm")}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {format(new Date(row.original?.endTime), "HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {row.original?.healthCareProvider.user.name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {row.original?.healthCareProvider.speciality}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={cn(
                      "rounded-sm px-2.5 py-1 text-xs font-medium",
                      row.original?.status === AppointmentStatus.PENDING &&
                        "bg-[#FFE097] text-[#A78025]",
                      row.original?.status === AppointmentStatus.CANCELLED &&
                        "bg-rose-100 text-rose-600",
                      row.original?.status === AppointmentStatus.COMPLETED &&
                        "bg-blue-100 text-blue-600",
                      row.original.status === AppointmentStatus.UPCOMING &&
                        "bg-teal-300 text-teal-600",
                    )}
                  >
                    {row.original?.status.charAt(0).toUpperCase() +
                      row.original?.status.slice(1).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Button size="icon" variant="outline">
                    <DotsHorizontalIcon className="h-4 w-4" />
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
            {table.getRowModel().rows.length} of{" "}
          </strong>
          <strong>{data.length}</strong> appointments
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
