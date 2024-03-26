import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

export default function MessagesPage() {
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[64px_1fr]">
      <Navbar />
      <Sidebar />
      <div className="row-start-1 row-end-3 border-r bg-white">
        <div className="flex h-16 items-center justify-start border-b">
          <h1 className="pl-4 text-lg font-semibold tracking-tight">
            Messages
          </h1>
        </div>
      </div>
      <ScrollArea className="col-start-3 bg-secondary"></ScrollArea>
    </div>
  );
}
