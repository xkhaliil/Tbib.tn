import React from "react";

export function NavbarSkeleton() {
  return (
    <header className="col-start-3 col-end-4 flex w-full items-center justify-between border-b bg-white px-8 py-[0.77rem]">
      <div className="flex w-full items-center gap-x-2.5 rounded-full border bg-secondary px-4 py-2 md:max-w-lg">
        <div className="mr-3 h-4 w-4 rounded-full bg-gray-200"></div>
        <div className="h-4 w-full rounded bg-gray-200"></div>
      </div>

      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
    </header>
  );
}
