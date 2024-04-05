import React from "react";

import { SideNavigation } from "@/components/base/patient/settings/side-navigation";

interface PatientSettingsLayoutProps {
  children: React.ReactNode;
}

export default function PatientSettingsLayout({
  children,
}: PatientSettingsLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 md:px-11">
      <div className="mb-4 md:mb-8">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <SideNavigation />
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
