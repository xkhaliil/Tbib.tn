import React from "react";

import { getAllPatients } from "@/actions/patient";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function AdminPatientTable() {
  const data = await getAllPatients();
  // @ts-ignore
  return <DataTable columns={columns} data={data} />;
}
