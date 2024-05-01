import React from "react";

import {
  getPatientNameGender,
  getPatientsByMonth,
  getRandomSixPatients,
} from "@/actions/patient";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { PatientGenderChart } from "@/components/base/admin-dashboard/charts/gender-patients-chart";
import AdminPatientChartDashboard from "@/components/base/admin-dashboard/charts/patients-chart";
import { AdminPatientTable } from "@/components/base/admin-dashboard/data-table/admin-patients-table/admin-patient-table";

export default async function PatientsAdminDashboard() {
  const PatientsByMonth = await getPatientsByMonth();
  const data: {
    people: {
      id: number;
      name: string;
      designation: string | null;
      image: string | null;
    }[];
  } = await getRandomSixPatients();
  const RandomSixPatients = data.people.map((patient) => ({
    id: patient.id,
    name: patient.name,
    designation: patient.designation || "Patient",
    image: patient.image || "/images/avatars/avatar1.jpg",
  }));
  const GenderChart = await getPatientNameGender();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <Card className="col-span-3 bg-muted/40">
              <CardHeader>
                <CardTitle>Total users per month</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <AdminPatientChartDashboard users={PatientsByMonth} />
              </CardContent>
            </Card>
            <div className="flex flex-col items-center bg-muted/40">
              <div className="mb-10 mt-10 flex w-full flex-row items-center justify-center">
                <AnimatedTooltip items={RandomSixPatients} />
              </div>
              <div>
                <PatientGenderChart patients={GenderChart} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div className="col-span-1 rounded-lg bg-muted/40 p-4 shadow-sm lg:col-span-5">
              <AdminPatientTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
