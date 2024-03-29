import React from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { FileSpreadsheetIcon, HeartPulseIcon, UsersIcon } from "lucide-react";

import { StatsCard } from "./stats-card";

export function StatsCards() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-4 rounded-xl border bg-white p-6 lg:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-border">
        <StatsCard title="Patients" value="146" icon={UsersIcon} />
        <StatsCard
          title="Appointments"
          value="56"
          icon={CalendarIcon}
          className="xl:pl-6"
        />
        <StatsCard
          title="Prescriptions Issued"
          value="78"
          icon={FileSpreadsheetIcon}
          className="xl:pl-6"
        />

        <StatsCard
          title="Consultations"
          value="120"
          icon={HeartPulseIcon}
          className="xl:pl-6"
        />
      </div>
    </div>
  );
}
