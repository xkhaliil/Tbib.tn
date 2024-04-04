import React from "react";

import { getAllPatients } from "@/actions/patient";

import { columns, Patient } from "./columns";
import { DataTable } from "./data-table";

export async function AdminPatientTable() {
  const data = await getAllPatients();
  // @ts-ignore
  return <DataTable columns={columns} data={data} />;
}
