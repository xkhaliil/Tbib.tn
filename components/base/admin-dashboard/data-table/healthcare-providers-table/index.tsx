import React from "react";

import { getAllDoctors } from "@/actions/doctors";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function HealthcareProvidersTable() {
  const data = await getAllDoctors();
  return (
    //@ts-ignore
    <DataTable columns={columns} data={data} />
  );
}
