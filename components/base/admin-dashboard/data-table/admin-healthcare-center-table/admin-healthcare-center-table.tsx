import React from "react";

import { getAllHealthcareCenters } from "@/actions/healthcare-center";

import { columns, HealthcareCenters } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<HealthcareCenters[]> {
  try {
    const hcc = await getAllHealthcareCenters();
    console.log(hcc);
    // @ts-ignore
    return hcc;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function AdminHealthcareCenterTable() {
  const data = await getData();
  return (
    <div className="mx-aut container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
