import React from "react";

import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { ProfileAndAccountFormAdmin } from "@/components/base/admin-dashboard/settings/profile-and-account-form";

export default function Dashboard() {
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] md:grid-rows-[56px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <AdminSidebar />
      <ScrollArea className="col-start-1 col-end-3 flex-1 md:col-start-2">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 text-sm text-muted-foreground">
              <Link href="/admin/" className="font-semibold text-primary">
                General
              </Link>
              <Link href="/admin/settings/security">Security</Link>
              <Link href="/admin/settings/notifications">Notifications</Link>
            </nav>
            <div className="grid gap-6">
              <ProfileAndAccountFormAdmin />
            </div>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
