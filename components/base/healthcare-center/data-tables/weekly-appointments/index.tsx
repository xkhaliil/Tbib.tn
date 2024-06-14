import React from "react";

import { fetchWeeklyAppointments } from "@/actions/appointment";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface WeeklyAppointmentsDataTableProps {
  healthCareCenterId?: string;
}

export async function WeeklyAppointmentsDataTable({
  healthCareCenterId,
}: WeeklyAppointmentsDataTableProps) {
  const weeklyAppointments = await fetchWeeklyAppointments(healthCareCenterId);

  if (!weeklyAppointments) {
    return null;
  }

  return <DataTable columns={columns} data={weeklyAppointments} />;
}
