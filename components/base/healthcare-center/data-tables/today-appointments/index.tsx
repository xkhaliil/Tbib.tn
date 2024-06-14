import React from "react";

import { fetchTodayAppointments } from "@/actions/appointment";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface TodayAppointmentsDataTableProps {
  healthCareCenterId?: string;
}

export async function TodayAppointmentsDataTable({
  healthCareCenterId,
}: TodayAppointmentsDataTableProps) {
  const todayAppointments = await fetchTodayAppointments(healthCareCenterId);

  console.log(todayAppointments);

  if (!todayAppointments) {
    return null;
  }

  return <DataTable columns={columns} data={todayAppointments} />;
}
