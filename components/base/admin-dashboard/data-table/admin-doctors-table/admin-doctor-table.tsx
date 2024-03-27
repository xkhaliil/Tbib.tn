import React from "react";

import { getAllDoctors } from "@/actions/doctors";

import { columns, Doctor } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Doctor[]> {
  try {
    const doctors = await getAllDoctors();
    console.log(doctors);
    // @ts-ignore
    return doctors;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function AdminDoctorTable() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
