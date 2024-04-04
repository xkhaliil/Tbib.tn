import React from "react";

import Link from "next/link";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { TunisianStatesComboBox } from "@/components/base/admin-dashboard/components/tunisian-states-combo-box";

export default function Dashboard() {
  return (
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
              <Link href="#" className="font-semibold text-primary">
                General
              </Link>
              <Link href="/admin/settings/security">Security</Link>
              <Link href="/admin/settings/notifications">Notifications</Link>
            </nav>
            <div className="grid gap-6">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle>Security prefrences </CardTitle>
                      <CardDescription>
                        Your account details are used to identify you and your
                        team in the system.
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <div className="pr-7">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Profile picture</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <FaFileUpload />
                          Choose from files
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MdDelete className="" /> Delete picture
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent>
                  <form className="flex flex-col gap-4">
                    Name:
                    <Input placeholder="Name" />
                    Email:
                    <Input placeholder="Email" disabled />
                    Phone:
                    <Input placeholder="phone" />
                    State:
                    <TunisianStatesComboBox />
                    City:
                    <Input placeholder="City" />
                    Postal code:
                    <Input placeholder="Postal code" />
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
