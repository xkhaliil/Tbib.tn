"use client";

import * as React from "react";

import Image from "next/image";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { FileIcon } from "lucide-react";

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableFacetedFilter } from "../healthcare-centers-table/data-table-faceted-filter";
import { PatientType } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<PatientType, any>[];
  data: PatientType[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
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
      <CardHeader className="px-7">
        <CardTitle>Patients</CardTitle>
        <CardDescription>
          View and manage all patients in the system.
        </CardDescription>
        <div className="flex items-center justify-between pt-4">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date Of Birth</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">Joined At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="p-8 text-center text-muted-foreground"
                >
                  No patients found.
                </TableCell>
              </TableRow>
            )}

            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Image
                      alt="Profile Image"
                      className="aspect-square rounded-md object-cover"
                      src={row.original?.user?.image ?? "/placeholder.svg"}
                      height="36"
                      width="36"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-medium">{row.getValue("name")}</h1>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {row.original?.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {format(
                    new Date(row.original?.user?.dateOfBirth ?? new Date()),
                    "yyyy/MM/dd",
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.original?.user.gender === "MALE" ? (
                    <span>Male</span>
                  ) : (
                    <span>Female</span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(
                    new Date(row.original?.user.createdAt ?? new Date()),
                    "yyyy/MM/dd",
                  )}
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
          Showing <strong>1-{data.length}</strong> of{" "}
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
