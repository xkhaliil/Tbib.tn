"use client";

import React from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CalendarIcon, HomeIcon } from "@radix-ui/react-icons";
import {
  FileTextIcon,
  HeartPulseIcon,
  LifeBuoyIcon,
  MessagesSquareIcon,
  PillIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/components/auth/user-button";
import { SidebarButton } from "@/components/base/navigation/sidebar-button";

export function Sidebar() {
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
          onClick={() => router.push("/hp/dashboard")}
          isActive={pathname === "/hp/dashboard"}
        />
        <SidebarButton
          label="Calendar"
          icon={CalendarIcon}
          onClick={() => router.push("/hp/dashboard/calendar")}
          isActive={pathname === "/hp/dashboard/calendar"}
        />
        <SidebarButton
          label="Messages"
          icon={MessagesSquareIcon}
          onClick={() => router.push("/hp/dashboard/messages")}
          isActive={pathname?.startsWith("/hp/dashboard/messages")}
        />
        <SidebarButton label="Patients" icon={UsersIcon} />
        <SidebarButton label="Medications" icon={PillIcon} />

        <Separator className="mb-4 w-10" />

        <SidebarButton
          label="Settings"
          icon={SettingsIcon}
          onClick={() => router.push("/hp/dashboard/settings")}
          isActive={pathname?.startsWith("/hp/dashboard/settings")}
        />
        <SidebarButton label="Support" icon={LifeBuoyIcon} />
      </div>

      <div className="mb-4 mt-auto flex flex-col items-center">
        <UserButton />
      </div>
    </aside>
  );
}
