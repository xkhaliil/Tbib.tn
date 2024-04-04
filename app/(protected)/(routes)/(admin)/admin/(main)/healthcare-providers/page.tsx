import React from "react";

import {
  totalHealthcareProvidersMonthlyWithIncrease,
  totalHealthcareProvidersWeeklyWithIncrease,
  totalHealthcareProvidersYearlyWithIncrease,
} from "@/actions/healthcare-provider";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { TotalHealthcareProvidersCard } from "@/components/base/admin-dashboard/cards/total-hp-card";
import { HealthcareProvidersChart } from "@/components/base/admin-dashboard/charts/doctors-chart";
import { HealthcareProvidersTable } from "@/components/base/admin-dashboard/data-table/healthcare-providers-table";

export default async function AdminDoctorsDashboard() {
  const healthcareProvidersWeeklyStats =
    await totalHealthcareProvidersWeeklyWithIncrease();
  const healthcareProvidersMonthlyStats =
    await totalHealthcareProvidersMonthlyWithIncrease();
  const healthcareProvidersYearlyStats =
    await totalHealthcareProvidersYearlyWithIncrease();
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        <ScrollArea className="flex-1">
          <main className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
            <div className="col-span-3 grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
              <TotalHealthcareProvidersCard
                total={healthcareProvidersWeeklyStats.total}
                increase={healthcareProvidersWeeklyStats.increase}
                period="week"
              />
              <TotalHealthcareProvidersCard
                total={healthcareProvidersMonthlyStats.total}
                increase={healthcareProvidersMonthlyStats.increase}
                period="month"
              />
              <TotalHealthcareProvidersCard
                total={healthcareProvidersYearlyStats.total}
                increase={healthcareProvidersYearlyStats.increase}
                period="year"
              />
            </div>
            <div className="col-span-3">
              <HealthcareProvidersTable />
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
