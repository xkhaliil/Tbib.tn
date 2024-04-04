import React from "react";

import { getAllHealthcareCenters } from "@/actions/healthcare-center";

import { columns, HealthcareCenters } from "./columns";
import { DataTable } from "./data-table";

export async function HealthcareCentersTable() {
  const data = await getAllHealthcareCenters();
  return (
    //@ts-ignore
    <DataTable columns={columns} data={data} />
  );
}
