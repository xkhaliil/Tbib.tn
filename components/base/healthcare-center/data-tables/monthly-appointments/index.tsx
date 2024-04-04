import React from "react";

import { fetchMonthlyAppointments } from "@/actions/appointment";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function MonthlyAppointmentsDataTable() {
  const monthlyAppointments = await fetchMonthlyAppointments();

  if (!monthlyAppointments) {
    return null;
  }

  return <DataTable columns={columns} data={monthlyAppointments} />;
}
