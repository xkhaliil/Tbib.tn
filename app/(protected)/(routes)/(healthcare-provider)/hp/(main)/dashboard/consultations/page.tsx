import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

export default function ConsultationsPage() {
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar />
      <Sidebar />
      <ScrollArea className="col-start-3 bg-secondary"></ScrollArea>
    </div>
  );
}
