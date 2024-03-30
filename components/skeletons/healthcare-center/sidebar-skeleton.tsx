import React from "react";

export function SidebarSkeleton() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 animate-pulse flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>

        <div className="h-px w-8 bg-gray-200"></div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200"></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200"></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200"></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200"></div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200"></div>
      </nav>
    </aside>
  );
}
