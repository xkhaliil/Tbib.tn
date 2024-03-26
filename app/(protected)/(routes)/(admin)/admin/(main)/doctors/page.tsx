"use client";

import React from "react";

import { getAllDoctors } from "@/actions/doctors";
import { FaUserDoctor } from "react-icons/fa6";

import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSideBar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import AdminDoctorChartDashboard from "@/components/base/admin-dashboard/charts/doctors-chart";
import { DoctorDashboardtable } from "@/components/base/admin-dashboard/data-tables/doctor-dashboard-table";

export default function AdminDoctorsDashboard() {
  return (
    <div className="grid h-screen grid-cols-[70px_1fr] grid-rows-[64px_1fr]">
      <AdminNavbar />
      <AdminSideBar />
      <main className="p-8">
        <div className="mt-8 grid w-full grid-cols-1  space-x-10 lg:grid-cols-6 xl:grid-cols-6">
          <div className="col-span-4 rounded-xl border bg-white p-6 shadow-sm">
            <AdminDoctorChartDashboard />
          </div>{" "}
          <div className="col-span-2 flex flex-col items-center justify-center space-y-4 rounded-xl border bg-white p-6">
            <div className="flex h-36 w-36 items-center justify-center rounded-xl bg-blue-400/40">
              <FaUserDoctor className="h-20 w-20" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-muted-foreground">
              Total doctors
            </h1>
            <p className="text-2xl font-bold tracking-tight">30</p>
          </div>
        </div>
        <DoctorDashboardtable />
      </main>
    </div>
  );
}
