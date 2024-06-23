import React from "react";

import {
  totalPatientsMonthlyWithIncrease,
  totalPatientsWeeklyWithIncrease,
  totalPatientsYearlyWithIncrease,
} from "@/actions/patient";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { TotalPatientsCard } from "@/components/base/admin-dashboard/cards/total-patients-card";
import { AdminPatientTable } from "@/components/base/admin-dashboard/data-table/admin-patients-table/admin-patient-table";

export default async function PatientsAdminDashboard() {
  const patientsWeeklyStats = await totalPatientsWeeklyWithIncrease();
  const patientsMonthlyStats = await totalPatientsMonthlyWithIncrease();
  const patientsYearlyStats = await totalPatientsYearlyWithIncrease();
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] md:grid-rows-[56px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <AdminSidebar />
      <ScrollArea className="col-start-1 col-end-3 flex-1 md:col-start-2">
        <main className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
          <div className="col-span-3 grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
            <TotalPatientsCard
              total={patientsWeeklyStats.total}
              increase={patientsWeeklyStats.increase}
              period="week"
            />
            <TotalPatientsCard
              total={patientsMonthlyStats.total}
              increase={patientsMonthlyStats.increase}
              period="month"
            />
            <TotalPatientsCard
              total={patientsYearlyStats.total}
              increase={patientsYearlyStats.increase}
              period="year"
            />
          </div>
          <div className="col-span-3">
            <AdminPatientTable />
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
