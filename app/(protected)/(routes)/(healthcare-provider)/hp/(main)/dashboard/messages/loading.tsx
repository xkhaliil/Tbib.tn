import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { NavigationSidebarSkeleton } from "@/components/skeletons/healthcare-provider/navigation-sidebar-skeleton";

export default function MessagesLoadingPage() {
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr]">
      <NavigationSidebarSkeleton />
      <div className="row-start-1 row-end-3 hidden flex-col overflow-hidden border-r bg-white lg:flex">
        <div className="flex h-16 animate-pulse items-center justify-between border-b p-4">
          <Skeleton className="h-6 w-1/3 rounded"></Skeleton>
          <Skeleton className="h-8 w-[127px] rounded-full"></Skeleton>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {[...Array(8)].map((_, index) => (
            <ConversationItemSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="col-start-2 col-end-4 flex h-screen w-full flex-col items-center justify-center bg-muted/40 lg:col-start-3">
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="h-[150px] w-[150px]" />
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="h-6 w-80 rounded"></Skeleton>
            <Skeleton className="h-4 w-72 rounded"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationItemSkeleton() {
  return (
    <div className="relative flex animate-pulse items-center space-x-3 rounded-xl px-2.5 py-4">
      <Skeleton className="h-11 w-11 rounded-full"></Skeleton>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Skeleton className="mb-1 h-4 w-36 rounded"></Skeleton>
              <Skeleton className="h-4 w-24 rounded"></Skeleton>
            </div>
            <Skeleton className="h-4 w-10 rounded"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
