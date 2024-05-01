import React from "react";

import { getCurrentSession, getHealthcareCenterByUserId } from "@/actions/auth";
import {
  getHealthcareCenterAppointments,
  getHealthcareProvidersByHealthcareCenterId,
} from "@/actions/healthcare-center";

import { Calendar } from "@/components/base/healthcare-center/calendar/weekly";
import { Header } from "@/components/base/healthcare-center/dashboard/header";
import {
  MobileSidebar,
  Sidebar,
} from "@/components/base/healthcare-center/dashboard/sidebar";

export default async function HealthcareCenterAppointmentsPage() {
  const currentUser = await getCurrentSession();
  const currentHealthcareCenter = await getHealthcareCenterByUserId(
    currentUser?.id,
  );
  const teamMembers = await getHealthcareProvidersByHealthcareCenterId(
    currentHealthcareCenter?.id,
  );
  const appointments = await getHealthcareCenterAppointments(
    teamMembers?.map((member) => member.id),
  );
  return (
    <div className="flex items-center">
      <Sidebar />
      <div className="w-full">
        <Header className="lg:py-0">
          <MobileSidebar />
        </Header>
        <Calendar appointments={appointments} />
      </div>
    </div>
  );
}
