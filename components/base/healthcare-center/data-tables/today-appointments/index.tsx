import React from "react";

import { fetchTodayAppointments } from "@/actions/appointment";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function TodayAppointmentsDataTable() {
  const todayAppointments = await fetchTodayAppointments();

  if (!todayAppointments) {
    return null;
  }

  return <DataTable columns={columns} data={todayAppointments} />;
}
