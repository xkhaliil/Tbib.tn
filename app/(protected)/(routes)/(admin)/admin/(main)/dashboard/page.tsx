import React from "react";

import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSideBar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsWrapper } from "@/components/base/admin-dashboard/admin-stats-wrapper";
import { TotalUsersChart } from "@/components/base/admin-dashboard/charts/total-users-chart";

export default function AdminDashboard() {
  return (
    <div className="grid h-screen grid-cols-[70px_1fr] grid-rows-[64px_1fr]">
      <AdminNavbar />
      <AdminSideBar />
      <main className="p-8">
        <AdminStatsWrapper />
        <div className="mt-8 grid w-full grid-cols-1  lg:grid-cols-6 xl:grid-cols-6">
          <div className="col-span-4 rounded-xl border bg-white p-6 shadow-sm">
            <TotalUsersChart />
          </div>
        </div>
      </main>
    </div>
  );
}
