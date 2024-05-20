import React from "react";

import { getAllAppointments } from "@/actions/appointment";
import { getAllHealthcareProviderPatients } from "@/actions/healthcare-provider";
import { getPatientsCount } from "@/actions/patient";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FileSpreadsheetIcon, HeartPulseIcon, UsersIcon } from "lucide-react";

import { StatsCard } from "./stats-card";

interface StatsCardsProps {
  healthcareProviderId: string | undefined;
}

export async function StatsCards({ healthcareProviderId }: StatsCardsProps) {
  const patientsCount =
    await getAllHealthcareProviderPatients(healthcareProviderId);
  const appointmentsCount = await getAllAppointments(healthcareProviderId);
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-4 rounded-xl border bg-white p-6 lg:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-border">
        <StatsCard
          title="Total Patients"
          value={patientsCount}
          icon={UsersIcon}
        />
        <StatsCard
          title="Total Appointments"
          value={appointmentsCount?.length}
          icon={CalendarIcon}
          className="xl:pl-6"
        />
        <StatsCard
          title="Total Consultations"
          value="120"
          icon={HeartPulseIcon}
          className="xl:pl-6"
        />
        <StatsCard
          title="Total Prescriptions Issued"
          value="78"
          icon={FileSpreadsheetIcon}
          className="xl:pl-6"
        />
      </div>
    </div>
  );
}
