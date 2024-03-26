import React from "react";

import { settingsSidebarItems } from "@/constants";
import { SettingsIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { SettingsSidebar } from "@/components/base/navigation/settings-sidebar";
import { Sidebar } from "@/components/base/navigation/sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[64px_1fr]">
      <Navbar />
      <Sidebar />
      <div className="row-start-1 row-end-3 border-r">
        <div className="flex h-16 items-center justify-start border-b">
          <SettingsIcon className="ml-4 h-5 w-5" />
          <h1 className="pl-2.5 text-lg font-semibold tracking-tight">
            Settings
          </h1>
        </div>

        <SettingsSidebar items={settingsSidebarItems} />
      </div>
      <ScrollArea className="col-start-3 bg-white">{children}</ScrollArea>
    </div>
  );
}
