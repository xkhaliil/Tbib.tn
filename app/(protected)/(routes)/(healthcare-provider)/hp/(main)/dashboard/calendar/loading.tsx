import React from "react";

import { NavigationSidebarSkeleton } from "@/components/skeletons/healthcare-provider/navigation-sidebar-skeleton";

export default function CalendarLoadingPage() {
  return (
    <div className="flex h-full">
      <NavigationSidebarSkeleton />
      <div className="flex flex-1 flex-col">
        <div className="flex animate-pulse items-center border-b px-8 py-[14px]">
          <div className="flex flex-auto">
            <div className="h-6 w-1/4 rounded bg-gray-200"></div>
          </div>

          <div className="flex items-center gap-x-6">
            <div className="h-9 rounded-md bg-gray-200 px-4 py-2"></div>
            <div className="flex items-center gap-x-2">
              <div className="h-9 w-9 rounded-md bg-gray-200"></div>
              <div className="h-9 w-9 rounded-md bg-gray-200"></div>
            </div>

            <div className="mx-2 h-6 w-px bg-gray-200"></div>

            <div className="h-9 w-44 rounded-md bg-gray-200 px-4 py-2"></div>
          </div>
        </div>

        <div className="flex w-full flex-1 animate-pulse flex-col bg-gray-100" />
      </div>
    </div>
  );
}
