import React, { useEffect, useState } from "react";

import { getDoctorsCount } from "@/actions/doctors";
import { getHealthcareCentersCount } from "@/actions/healthcare-center";
import { getPatientsCount } from "@/actions/patient";
import { countUsersByMonth } from "@/actions/users";
import { UsersIcon } from "lucide-react";
import { BsHospitalFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import { TotalUsersChart } from "@/components/base/admin-dashboard/charts/total-users-chart";

export default async function AdminDashboard() {
  const patientsCount = await getPatientsCount();
  const doctorCount = await getDoctorsCount();
  const healthcareCenterCount = await getHealthcareCentersCount();
  const totalUsersPerMonth = await countUsersByMonth();

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
                value={patientsCount}
                icon={UsersIcon}
                className="bg-muted/40 shadow-sm"
              />
            </div>
            <div className="col-span-2 rounded-lg p-4 lg:col-span-1">
              <AdminStatsCard
                title="Doctors"
                value={doctorCount}
                icon={FaUserDoctor}
                className="bg-muted/40 shadow-sm xl:pl-6"
              />
            </div>
            <div className="col-span-2 rounded-lg p-4 lg:col-span-1">
              <AdminStatsCard
                title="healthcare centers"
                value={healthcareCenterCount}
                icon={BsHospitalFill}
                className="bg-muted/40 shadow-sm xl:pl-6"
              />
            </div>
          </div>
          <div className=" grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-5 ">
            <Card className="col-span-3 bg-muted/40">
              <CardHeader>
                <CardTitle>Total users per month</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <TotalUsersChart users={totalUsersPerMonth} />
              </CardContent>
            </Card>
            <Card className="col-span-2 bg-muted/40">
              <CardHeader>
                <CardTitle>Recent activities</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Recent activities will be shown here</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
