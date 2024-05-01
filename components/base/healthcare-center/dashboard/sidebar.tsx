"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon, HomeIcon } from "@radix-ui/react-icons";
import { Clock4Icon, MenuIcon, SettingsIcon, Users2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarLink } from "@/components/base/healthcare-center/dashboard/sidebar-link";
import { Logo } from "@/components/marketing/logo";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background lg:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Logo className="h-7 w-7" />

        <Separator className="w-8" />

        <SidebarLink
          label="Dashboard"
          icon={HomeIcon}
          href="/hc/dashboard"
          isActive={pathname === "/hc/dashboard"}
        />
        <SidebarLink
          label="Appointments"
          icon={CalendarIcon}
          href="/hc/dashboard/appointments"
          isActive={pathname === "/hc/dashboard/appointments"}
        />
        <SidebarLink
          label="Team"
          icon={Users2Icon}
          href="/hc/dashboard/team"
          isActive={pathname === "/hc/dashboard/team"}
        />
        <SidebarLink
          label="Opening Hours"
          icon={Clock4Icon}
          href="/hc/dashboard/opening-hours"
          isActive={pathname === "/hc/dashboard/opening-hours"}
        />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <SidebarLink
          label="Settings"
          icon={SettingsIcon}
          href="/hc/dashboard/settings"
          isActive={pathname === "/hc/dashboard/settings"}
        />
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <div>
            <Logo className="h-8 w-8" />
            <span className="sr-only">Oladoc</span>
          </div>
          <MobileSidebarLink
            label="Dashboard"
            icon={HomeIcon}
            href="/hc/dashboard"
            isActive={usePathname() === "/hc/dashboard"}
          />
          <MobileSidebarLink
            label="Calendar"
            icon={CalendarIcon}
            href="/hc/calendar"
            isActive={usePathname() === "/hc/calendar"}
          />
          <MobileSidebarLink
            label="Team"
            icon={Users2Icon}
            href="/hc/dashboard/team"
            isActive={usePathname() === "/hc/dashboard/team"}
          />
          <MobileSidebarLink
            label="Opening Hours"
            icon={Clock4Icon}
            href="/hc/opening-hours"
            isActive={usePathname() === "/hc/opening-hours"}
          />
          <MobileSidebarLink
            label="Settings"
            icon={SettingsIcon}
            href="/hc/settings"
            isActive={usePathname() === "/hc/settings"}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

interface MobileSidebarLinkProps {
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

export function MobileSidebarLink({
  label,
  icon: Icon,
  href,
  isActive,
}: MobileSidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-blue-600",
        isActive && "text-blue-600",
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}
