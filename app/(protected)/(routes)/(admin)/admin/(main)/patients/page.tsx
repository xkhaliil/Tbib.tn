import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { TotalPatientsCard } from "@/components/base/admin-dashboard/cards/total-patients-card";
import { AdminPatientTable } from "@/components/base/admin-dashboard/data-table/admin-patients-table/admin-patient-table";

export default async function PatientsAdminDashboard() {
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] md:grid-rows-[56px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <AdminSidebar />
      <ScrollArea className="col-start-1 col-end-3 flex-1 md:col-start-2">
        <main className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
          <div className="col-span-3 grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
            <TotalPatientsCard total={100} increase={10} period="week" />
            <TotalPatientsCard total={1000} increase={100} period="month" />
            <TotalPatientsCard total={10000} increase={1000} period="year" />
          </div>
          <div className="col-span-3">
            <AdminPatientTable />
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
