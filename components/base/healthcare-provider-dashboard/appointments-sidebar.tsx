import React from "react";

import { AppointmentsWithPatient } from "@/types";

import { ScrollArea } from "@/components/ui/scroll-area";

import { CancelledAppointments } from "./cancelled-appointments";
import { CancelledAppointmentsBar } from "./cancelled-appointments-bar";
import { ExpiredAppointments } from "./expired-appointments";
import { ExpiredAppointmentsBar } from "./expired-appointments-bar";
import { FutureAppointments } from "./future-appointments";
import { PastAppointments } from "./past-appointments";
import { PastAppointmentsBar } from "./past-appointments-bar";
import { UpcomingAppointmentsBar } from "./upcoming-appointments-bar";

interface AppointmentsSidebarProps {
  futureAppointments: AppointmentsWithPatient | undefined;
  pastAppointments: AppointmentsWithPatient | undefined;
  cancelledAppointments: AppointmentsWithPatient | undefined;
  expiredAppointments: AppointmentsWithPatient | undefined;
}

export function AppointmentsSidebar({
  futureAppointments,
  pastAppointments,
  cancelledAppointments,
  expiredAppointments,
}: AppointmentsSidebarProps) {
  return (
    <aside className="row-start-1 row-end-3 flex h-screen w-[22rem] flex-col border-r bg-white">
      <UpcomingAppointmentsBar />

      <ScrollArea>
        <FutureAppointments appointments={futureAppointments} />
        <PastAppointmentsBar />
        <PastAppointments appointments={pastAppointments} />
        <CancelledAppointmentsBar />
        <CancelledAppointments appointments={cancelledAppointments} />
        <ExpiredAppointmentsBar />
        <ExpiredAppointments appointments={expiredAppointments} />
      </ScrollArea>
    </aside>
  );
}
