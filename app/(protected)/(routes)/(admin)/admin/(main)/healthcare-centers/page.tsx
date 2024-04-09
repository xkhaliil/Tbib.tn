import React from "react";

import {
  getHealthCareCentersByMonth,
  totalHealthcareCentersMonthlyWithIncrease,
  totalHealthcareCentersWeeklyWithIncrease,
  totalHealthcareCentersYearlyWithIncrease,
} from "@/actions/healthcare-center";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { TotalHealthcareCentersCard } from "@/components/base/admin-dashboard/cards/total-hc-card";
import { HealthcareCentersTable } from "@/components/base/admin-dashboard/data-table/healthcare-centers-table";

export default async function HealthcareCenterAdminDashboard() {
  const healthcareCentersWeeklyStats =
    await totalHealthcareCentersWeeklyWithIncrease();
  const healthcareCentersMonthlyStats =
    await totalHealthcareCentersMonthlyWithIncrease();
  const healthcareCentersYearlyStats =
    await totalHealthcareCentersYearlyWithIncrease();
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] md:grid-rows-[56px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <AdminSidebar />
      <ScrollArea className="col-start-1 col-end-3 flex-1 md:col-start-2">
        <main className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
          <div className="col-span-3 grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
            <TotalHealthcareCentersCard
              total={healthcareCentersWeeklyStats.total}
              increase={healthcareCentersWeeklyStats.increase}
              period="week"
            />
            <TotalHealthcareCentersCard
              total={healthcareCentersMonthlyStats.total}
              increase={healthcareCentersMonthlyStats.increase}
              period="month"
            />
            <TotalHealthcareCentersCard
              total={healthcareCentersYearlyStats.total}
              increase={healthcareCentersYearlyStats.increase}
              period="year"
            />
          </div>
          <div className="col-span-3">
            <HealthcareCentersTable />
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
