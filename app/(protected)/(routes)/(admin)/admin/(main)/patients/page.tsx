import React from "react";

import { getPatientsByMonth, getPatientsCount } from "@/actions/patient";
import { UsersIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import AdminPatientChartDashboard from "@/components/base/admin-dashboard/charts/patients-chart";
import { AdminPatientTable } from "@/components/base/admin-dashboard/data-table/admin-patients-table/admin-patient-table";

export default async function PatientsAdminDashboard() {
  const totallPatients = await getPatientsCount();
  const PatientsByMonth = await getPatientsByMonth();
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

            <div className="rounded-lgp-4 col-span-2 flex items-center justify-center lg:col-span-1 ">
              {" "}
              <AdminStatsCard
                title="Patients"
                value={totallPatients}
                icon={UsersIcon}
                className="bg-muted/40 shadow-sm xl:pl-6 "
              />
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
