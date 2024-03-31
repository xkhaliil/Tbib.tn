import React from "react";

import { getAllDoctors } from "@/actions/doctors";
import { UsersIcon } from "lucide-react";
import { BsHospitalFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import AdminDoctorChartDashboard from "@/components/base/admin-dashboard/charts/doctors-chart";
import { TotalUsersChart } from "@/components/base/admin-dashboard/charts/total-users-chart";
import { AdminDoctorTable } from "@/components/base/admin-dashboard/data-table/admin-doctors-table/admin-doctor-table";

export default function AdminDoctorsDashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="col-span-2 rounded-lg  bg-muted/40 p-4 shadow-sm lg:col-span-3">
              <AdminDoctorChartDashboard />
            </div>
            <div className="rounded-lgp-4 col-span-2 flex items-center justify-center lg:col-span-1 ">
              {" "}
              <AdminStatsCard
                title="healthcare centers"
                value="78"
                icon={BsHospitalFill}
                className="bg-muted/40 shadow-sm xl:pl-6 "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div className="col-span-1 rounded-lg bg-muted/40 p-4 shadow-sm lg:col-span-5">
              <AdminDoctorTable/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
