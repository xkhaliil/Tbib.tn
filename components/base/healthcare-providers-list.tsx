"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { getHealthCareProviderById } from "@/actions/healthcare-provider";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

type HealthCareProvider = Awaited<ReturnType<typeof getHealthCareProviderById>>;

interface HealthcareProvidersListProps {
  columns: ColumnDef<HealthCareProvider, any>[];
  data: HealthCareProvider[];
}

export function HealthcareProvidersList<TData, TValue>({
  columns,
  data,
}: HealthcareProvidersListProps) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  return (
    <div>
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="mb-2.5 flex items-center gap-2 rounded-xl border p-4"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Image
                src={row.original?.user.image || "/placeholder.svg"}
                alt={row.original?.user.name || "User"}
                className="h-8 w-8 rounded-full object-cover"
                width={500}
                height={500}
              />
              <p className="text-sm text-muted-foreground">
                {row.original?.user.name}
              </p>

              <span className="text-xs text-muted-foreground">/</span>

              <p className="text-sm text-muted-foreground">
                {row.original?.speciality}
              </p>

              <span className="text-xs text-muted-foreground">/</span>

              <p className="text-sm text-muted-foreground">
                {row.original?.officeState}
              </p>
            </div>

            <Button variant="blue" size="sm" asChild>
              <Link href={`/hp/profile/${row.original?.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex items-center justify-end space-x-2">
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
    </div>
  );
}
