import React from "react";

import { getAllAppointments } from "@/actions/appointment";
import { getAllConsultations } from "@/actions/consultation";
import { getAllHealthcareProviderPatients } from "@/actions/healthcare-provider";
import { getAllPrescriptions } from "@/actions/prescription";
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
  const consultationsCount = await getAllConsultations(healthcareProviderId);
  const prescriptionsCount = await getAllPrescriptions(healthcareProviderId);
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
          value={consultationsCount?.length}
          icon={HeartPulseIcon}
          className="xl:pl-6"
        />
        <StatsCard
          title="Total Prescriptions Issued"
          value={prescriptionsCount?.length}
          icon={FileSpreadsheetIcon}
          className="xl:pl-6"
        />
      </div>
    </div>
  );
}
