import React from "react";

import { Loader } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { NavigationSidebarSkeleton } from "@/components/skeletons/healthcare-provider/navigation-sidebar-skeleton";

export default function ConversationLoadingPage() {
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
      <div className="col-start-2 col-end-4 flex h-screen w-full flex-col justify-between bg-muted/40 lg:col-start-3">
        <div className="flex h-16 w-full items-center justify-between border-b bg-white p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 rounded"></Skeleton>
              <Skeleton className="h-2 w-16 rounded"></Skeleton>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Loader className="h-16 w-16 animate-spin text-muted-foreground" />
        </div>
        <div className="flex w-full items-center justify-between gap-2 border-t bg-white p-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-[53px]" />
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
