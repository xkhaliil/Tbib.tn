"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      <Link
        href="/patient/dashboard/settings"
        className={cn(
          pathname === "/patient/dashboard/settings" &&
            "font-semibold text-primary",
        )}
      >
        Profile & Account
      </Link>
      <Link
        href="/patient/dashboard/settings/security"
        className={cn(
          pathname === "/patient/dashboard/settings/security" &&
            "font-semibold text-primary",
        )}
      >
        Password & Security
      </Link>
      <Link
        href="/patient/dashboard/settings/notifications"
        className={cn(
          pathname === "/patient/dashboard/settings/notifications" &&
            "font-semibold text-primary",
        )}
      >
        Notifications
      </Link>
    </nav>
  );
}
