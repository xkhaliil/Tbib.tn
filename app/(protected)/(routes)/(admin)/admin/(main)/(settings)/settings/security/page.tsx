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
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardHeader>
                        <CardTitle>
                          Change Privacy & Security settings
                        </CardTitle>
                        <CardDescription>
                          Your account details are used to identify you and your
                          team in the system.
                        </CardDescription>
                      </CardHeader>
                    </div>
                  </div>
                  <CardContent className="border p-7">
                    <form className="flex flex-col gap-4">
                      <div className="flex items-center justify-between pr-5">
                        <div className="items-top flex space-x-2">
                          <div className="grid gap-1.5 leading-none">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Reset password
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Change your password.
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button></Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardContent className="border p-7">
                    <form className="flex flex-col gap-4">
                      <div className="flex items-center justify-between pr-5">
                        <div className="items-top flex space-x-2">
                          <div className="grid gap-1.5 leading-none">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Two-factor authentication
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account.
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button>2FA</Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
