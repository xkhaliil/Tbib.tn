import React from "react";

import {
  getAllDoctors,
  getDoctorsCount,
  getTop5RateScoreDoctor,
} from "@/actions/doctors";
import {
  getAllHealthcareCenters,
  getHealthcareCentersCount,
} from "@/actions/healthcare-center";
import { getAllPatients, getPatientsCount } from "@/actions/patient";
import { countUsersByMonth } from "@/actions/users";
import { DoctorIcon } from "@/icons/doctor-icon";
import { HealthcareCenterIcon } from "@/icons/healthcare-center-icon";
import { MedicalMaskIcon } from "@/icons/medical-mask-icon";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { AdminStatsCard } from "@/components/base/admin-dashboard/admin-stats-card";
import { TotalUsersChart } from "@/components/base/admin-dashboard/charts/total-users-chart";
import { Top5Doctors } from "@/components/base/admin-dashboard/general-stats/top-5-doctors";

export default async function AdminDashboard() {
  const patientsCount = await getPatientsCount();
  const doctorCount = await getDoctorsCount();
  const healthcareCenterCount = await getHealthcareCentersCount();
  const totalUsersPerMonth = await countUsersByMonth();
  const patients = await getAllPatients();
  const healthcareProviders = await getAllDoctors();
  const healthcareCenters = await getAllHealthcareCenters();
  const top5Doctors = await getTop5RateScoreDoctor();
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] md:grid-rows-[56px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <AdminSidebar />
      <ScrollArea className="col-start-1 col-end-3 flex-1 md:col-start-2">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg lg:col-span-1">
              <AdminStatsCard
                title="Patients"
                value={patientsCount}
                icon={MedicalMaskIcon}
                data={patients}
              />
            </div>
            <div className="col-span-2 rounded-lg lg:col-span-1">
              <AdminStatsCard
                title="Healthcare Providers"
                value={doctorCount}
                icon={DoctorIcon}
                data={healthcareProviders}
                className="xl:pl-6"
              />
            </div>
            <div className="col-span-2 rounded-lg lg:col-span-1">
              <AdminStatsCard
                title="Healthcare Centers"
                value={healthcareCenterCount}
                icon={HealthcareCenterIcon}
                data={healthcareCenters}
                className="xl:pl-6"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-5">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Total Users per Month</CardTitle>
                <CardDescription>
                  The total number of users registered in the system per month.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TotalUsersChart users={totalUsersPerMonth} />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Top Rated Doctors</CardTitle>
                <CardDescription>
                  The top 5 doctors with the highest rating score.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Top5Doctors doctors={top5Doctors} />
              </CardContent>
            </Card>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
