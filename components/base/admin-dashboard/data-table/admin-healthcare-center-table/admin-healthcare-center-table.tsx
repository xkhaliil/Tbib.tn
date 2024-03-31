import React from "react";

import { getAllPatients } from "@/actions/patient";

import { columns, Patient } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Patient[]> {
  try {
    const patients = await getAllPatients();
    // @ts-ignore
    return patients;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function AdminPatientTable() {
  const data = await getData();
  return (
    <div className="mx-aut container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
