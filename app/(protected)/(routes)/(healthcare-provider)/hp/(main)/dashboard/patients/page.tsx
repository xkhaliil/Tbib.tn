import React from "react";

import {
  getAllAppointments,
  getAllTodayAppointments,
  getPastAppointments,
} from "@/actions/appointment";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import { AppointmentStatus } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AllPatientsDataTable } from "@/components/base/healthcare-provider-dashboard/all-patients-data-table";
import { AppointmentsSidebar } from "@/components/base/healthcare-provider-dashboard/appointments-sidebar";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { Sidebar } from "@/components/base/navigation/sidebar";

export default async function HealthcareProviderPatientsPage() {
  const user = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(user?.id);

  const appointments = await getAllAppointments(healthcareProvider?.id);
  const pastAppointments = await getPastAppointments(healthcareProvider?.id);

  const todayAppointments = await getAllTodayAppointments(
    healthcareProvider?.id,
  );

  const cancelledAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.CANCELLED,
  );

  const expiredAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.EXPIRED,
  );
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[3.5rem_1fr]">
      <Navbar />
      <Sidebar />
      <AppointmentsSidebar
        futureAppointments={todayAppointments}
        pastAppointments={pastAppointments}
        cancelledAppointments={cancelledAppointments}
        expiredAppointments={expiredAppointments}
      />
      <ScrollArea className="col-start-3 bg-secondary p-8">
        <div className="mb-4 flex flex-col space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-sm text-muted-foreground">
            Here you can see all the patients that you are currently treating.
          </p>
        </div>
        <AllPatientsDataTable />
      </ScrollArea>
    </div>
  );
}
