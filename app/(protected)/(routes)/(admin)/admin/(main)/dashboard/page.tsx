import React from "react";

import { UsersIcon } from "lucide-react";
import { BsHospitalFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import { TotalUsersChart } from "@/components/base/admin-dashboard/charts/total-users-chart";

export default function AdminDashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        <main className=" flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg p-4 lg:col-span-1 ">
              <AdminStatsCard
                title="Patients"
                value="146"
                icon={UsersIcon}
                className="bg-muted/40 shadow-sm"
              />
            </div>
            <div className="col-span-2 rounded-lg p-4 lg:col-span-1">
              <AdminStatsCard
                title="Doctors"
                value="56"
                icon={FaUserDoctor}
                className="bg-muted/40 shadow-sm xl:pl-6"
              />
            </div>
            <div className="col-span-2 rounded-lg p-4 lg:col-span-1">
              <AdminStatsCard
                title="healthcare centers"
                value="78"
                icon={BsHospitalFill}
                className="bg-muted/40 shadow-sm xl:pl-6"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="col-span-1 rounded-lg  bg-muted/40 p-4 shadow-sm lg:col-span-3">
              <TotalUsersChart />
            </div>
            <div className="col-span-1 rounded-lg border border-dashed border-black bg-background p-4 lg:col-span-2">
              Empty :(
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
