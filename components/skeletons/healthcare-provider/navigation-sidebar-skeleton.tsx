import React from "react";

export function NavigationSidebarSkeleton() {
  return (
    <aside className="row-start-1 row-end-3 flex h-screen w-[70px] flex-col items-center border-r bg-white">
      <div className="flex h-[64px] w-full items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
      </div>

      <div className="mb-4 h-px w-10 bg-gray-200"></div>

      <div className="flex flex-col space-y-4">
        <div className="h-[45px] w-[45px] rounded-lg bg-gray-200"></div>
        <div className="h-[45px] w-[45px] rounded-lg bg-gray-200"></div>
        <div className="h-[45px] w-[45px] rounded-lg bg-gray-200"></div>
        <div className="h-[45px] w-[45px] rounded-lg bg-gray-200"></div>
        <div className="h-[45px] w-[45px] rounded-lg bg-gray-200"></div>

        <div className="mb-4 h-px w-10 bg-gray-200"></div>

        <div className="h-[45px] w-[45px] rounded-lg bg-gray-200"></div>
      </div>

      <div className="mb-4 mt-auto flex flex-col items-center">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <div className="h-full w-full rounded-full bg-gray-200"></div>
        </div>
      </div>
    </aside>
  );
}
