import React from "react";

import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";

export default function AdminDashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg border border-dashed border-black bg-background p-4 lg:col-span-1"></div>
            <div className="col-span-2 rounded-lg border border-dashed border-black bg-background p-4 lg:col-span-1"></div>
            <div className="col-span-2 rounded-lg border border-dashed border-black bg-background p-4 lg:col-span-1"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="col-span-1 rounded-lg border border-dashed border-black bg-background p-4 lg:col-span-3"></div>
            <div className="col-span-1 rounded-lg border border-dashed border-black bg-background p-4 lg:col-span-2"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
