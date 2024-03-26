import React from "react";

import { AppointmentItemSkeleton } from "@/components/skeletons/healthcare-provider/appointment-item-skeleton";
import { NavbarSkeleton } from "@/components/skeletons/healthcare-provider/navbar-skeleton";
import { NavigationSidebarSkeleton } from "@/components/skeletons/healthcare-provider/navigation-sidebar-skeleton";

export default function DashboardLoadingPage() {
  return (
    <div className="grid h-screen animate-pulse grid-cols-[70px,352px,1fr] grid-rows-[64px,1fr]">
      <NavbarSkeleton />
      <NavigationSidebarSkeleton />

      <aside className="row-start-1 row-end-3 flex h-screen w-[22rem] flex-col border-r">
        <div className="flex h-16 items-center justify-between border-b bg-gray-100" />
        {[...Array(8)].map((_, idx) => (
          <AppointmentItemSkeleton key={idx} />
        ))}
      </aside>

      <div className="col-start-3 animate-pulse bg-secondary p-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <div className="h-6 w-[480px] rounded-md bg-gray-200"></div>
            <div className="h-4 w-[575px] rounded-md bg-gray-200"></div>
          </div>
          <div className="h-8 w-[175px] rounded-full bg-gray-200"></div>
        </div>

        <div className="mt-8 grid h-[105px] w-full gap-4 rounded-md bg-gray-200 p-6" />
      </div>
    </div>
  );
}
