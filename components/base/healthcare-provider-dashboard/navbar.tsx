import React from "react";

import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import { getHealthcareProviderNotifications } from "@/actions/notifications";

import { cn } from "@/lib/utils";

import { SearchButton } from "@/components/search-button";

import { NotificationsFeed } from "./notifications-feed";

interface NavbarProps {
  className?: string;
}

export async function Navbar({ className }: NavbarProps) {
  const authenticatedUser = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(
    authenticatedUser?.id,
  );
  const notifications = await getHealthcareProviderNotifications(
    healthcareProvider?.id,
  );
  return (
    <header
      className={cn(
        "z-10 col-start-3 col-end-4 flex h-16 w-full items-center justify-between border-b bg-white px-8",
        className,
      )}
    >
      <SearchButton />

      <div className="flex items-center space-x-4">
        <NotificationsFeed
          notifications={notifications || []}
          healthcareProvider={healthcareProvider}
        />
      </div>
    </header>
  );
}
