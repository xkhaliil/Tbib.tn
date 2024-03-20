import React from "react";

export function AppointmentItemSkeleton() {
  return (
    <div className="flex animate-pulse items-center border-b border-l-[6px] p-4">
      <div className="flex space-x-3">
        <div className="h-9 w-9 rounded-full bg-gray-200"></div>
        <div>
          <div className="flex flex-col">
            <div className="h-3 w-[135px] rounded-md bg-gray-200"></div>
            <div className="mt-2 h-2.5 w-[145px] rounded-md bg-gray-200"></div>
            <div className="mt-2 h-2.5 w-[135px] rounded-md bg-gray-200"></div>
          </div>
          <div className="mt-4">
            <div>
              <div className="h-2.5 w-[135px] rounded-md bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto h-8 w-8 rounded-full bg-gray-200"></div>
    </div>
  );
}
