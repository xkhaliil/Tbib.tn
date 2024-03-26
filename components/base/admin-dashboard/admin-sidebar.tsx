"use client";

import React from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon } from "@radix-ui/react-icons";
import { MessagesSquareIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { BsHospital } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/components/auth/user-button";
import { SidebarButton } from "@/components/base/navigation/sidebar-button";

export function AdminSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <aside className="row-start-1 row-end-3 flex h-screen w-[70px] flex-col items-center border-r bg-white">
      <div className="flex h-[64px] w-full items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
      </div>

      <Separator className="mb-4 w-10" />

      <div className="flex flex-col space-y-4">
        <SidebarButton
          label="Dashboard"
          icon={HomeIcon}
          onClick={() => router.push("/admin/dashboard")}
          isActive={pathname === "/admin/dashboard"}
        />
        <SidebarButton
          label="Doctors"
          icon={FaUserDoctor}
          onClick={() => router.push("/admin/doctors")}
          isActive={pathname === "/admin/doctors"}
        />
        <SidebarButton
          label="Patients"
          icon={UsersIcon}
          onClick={() => router.push("/admin/patients")}
          isActive={pathname === "/admin/patients"}
        />
        <SidebarButton label="Healthcare centers" icon={BsHospital} />
        <Separator className="mb-4 w-10" />
        <SidebarButton
          label="Settings"
          icon={SettingsIcon}
          onClick={() => router.push("/admin/settings")}
          isActive={pathname.startsWith("/admin/settings")}
        />
      </div>

      <div className="mb-4 mt-auto flex flex-col items-center">
        <UserButton />
      </div>
    </aside>
  );
}
