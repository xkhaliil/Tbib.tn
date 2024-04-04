import React from "react";

import { fetchWeeklyAppointments } from "@/actions/appointment";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function WeeklyAppointmentsDataTable() {
  const weeklyAppointments = await fetchWeeklyAppointments();

  if (!weeklyAppointments) {
    return null;
  }

  return <DataTable columns={columns} data={weeklyAppointments} />;
}
