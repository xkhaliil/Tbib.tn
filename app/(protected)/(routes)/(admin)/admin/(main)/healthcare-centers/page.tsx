import React from "react";

import {
  getHealthCareCentersByMonth,
  getHealthcareCentersCount,
} from "@/actions/healthcare-center";
import { BsHospitalFill } from "react-icons/bs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import { AdminHealthcareCenterChartDashboard } from "@/components/base/admin-dashboard/charts/healthcare-center-chart";
import { HealthcareCentersTable } from "@/components/base/admin-dashboard/data-table/healthcare-centers-table";

export default async function HealthcareCenterAdminDashboard() {
  const healthcareCentersCount = await getHealthcareCentersCount();
  const healthCareCentersUsers = await getHealthCareCentersByMonth();
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
                <AdminHealthcareCenterChartDashboard
                  users={healthCareCentersUsers}
                />
              </CardContent>
            </Card>
            <div className="col-span-2 flex items-center justify-center rounded-lg p-4 lg:col-span-1 ">
              {" "}
              <AdminStatsCard
                title="healthcare centers"
                value={healthcareCentersCount}
                icon={BsHospitalFill}
                className="bg-muted/40 shadow-sm xl:pl-6 "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div className="col-span-1 rounded-lg bg-muted/40 p-4 shadow-sm lg:col-span-5">
              <HealthcareCentersTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
