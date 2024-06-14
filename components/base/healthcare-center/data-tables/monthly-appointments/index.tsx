import React from "react";

import { fetchMonthlyAppointments } from "@/actions/appointment";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface MonthlyAppointmentsDataTableProps {
  healthCareCenterId?: string;
}

export async function MonthlyAppointmentsDataTable({
  healthCareCenterId,
}: MonthlyAppointmentsDataTableProps) {
  const monthlyAppointments =
    await fetchMonthlyAppointments(healthCareCenterId);

  if (!monthlyAppointments) {
    return null;
  }

  return <DataTable columns={columns} data={monthlyAppointments} />;
}
