import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { PasswordAndSecurityFormAdmin } from "@/components/base/admin-dashboard/settings/password-and-security-form";

export default function SecurityAdminPage() {
  return (
    <div>
      {" "}
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminNavbar />
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm text-muted-foreground">
                <Link href="/admin/settings/general">General</Link>
                <Link
                  href="/admin/settings/security"
                  className="font-semibold text-primary"
                >
                  Security
                </Link>
                <Link href="/admin/settings/notifications">Notifications</Link>
              </nav>
              <div className="grid gap-6">
                <PasswordAndSecurityFormAdmin />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
