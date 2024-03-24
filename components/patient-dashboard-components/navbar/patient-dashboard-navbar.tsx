import React from "react";

import Image from "next/image";
import { Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PatientDashboardNavbar() {
  return (
    <div className="flex h-20 w-screen justify-between bg-slate-100 px-5 shadow-md">
      <div className="ml-10 flex items-center text-5xl text-black">logo</div>
      <div className=" flex items-center space-x-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="h-12 bg-transparent">
              <Bell className="mr-2 h-5 w-5" /> <div>3</div>
            </Button>{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Appointment reminder</DropdownMenuItem>
            <DropdownMenuItem>Appointment canceled</DropdownMenuItem>
            <DropdownMenuItem>Appointment rescheduled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>logged in as Maher</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Well guide</DropdownMenuItem>
            <DropdownMenuItem>Past appointment</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
