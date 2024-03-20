import { getAllAppointments } from "@/actions/appointment";
import { getPatientsWithAtLeastOneAppointment } from "@/actions/patient";
import { AppointmentStatus } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, startOfToday } from "date-fns";

import { currentUser } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppointmentsSidebar } from "@/components/base/healthcare-provider-dashboard/appointments-sidebar";
import { GenderBarChart } from "@/components/base/healthcare-provider-dashboard/charts/gender-bar-chart";
import { PatientsOverviewChart } from "@/components/base/healthcare-provider-dashboard/charts/patients-overview-chart";
import { Navbar } from "@/components/base/healthcare-provider-dashboard/navbar";
import { DataTable } from "@/components/base/healthcare-provider-dashboard/new-patients-data-table";
import { columns } from "@/components/base/healthcare-provider-dashboard/new-patients-data-table/columns";
import { StatsCards } from "@/components/base/healthcare-provider-dashboard/stats-cards";
import { Sidebar } from "@/components/base/navigation/sidebar";

const piedata = [
  { name: "Child", value: 55 },
  { name: "Teen", value: 15 },
  { name: "Adult", value: 30 },
  { name: "Elderly", value: 10 },
];

const COLORS = ["#24a581", "#f991dc", "#fea25f", "#93e7fe"];

export default async function DashboardPage() {
  const user = await currentUser();
  const patients = await getPatientsWithAtLeastOneAppointment();
  const appointments = await getAllAppointments();

  const futureAppointments = appointments?.filter(
    (appointment) =>
      new Date(appointment.date) >= startOfToday() &&
      appointment.status !== AppointmentStatus.CANCELLED &&
      appointment.status !== AppointmentStatus.COMPLETED &&
      appointment.status !== AppointmentStatus.EXPIRED,
  );

  const pastAppointments = appointments?.filter(
    (appointment) =>
      new Date(appointment.date) < startOfToday() ||
      appointment.status === AppointmentStatus.COMPLETED,
  );

  const cancelledAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.CANCELLED,
  );

  const expiredAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.EXPIRED,
  );
  return (
    <div className="grid h-screen grid-cols-[70px_352px_1fr] grid-rows-[64px_1fr]">
      <Navbar />
      <Sidebar />
      <AppointmentsSidebar
        futureAppointments={futureAppointments}
        pastAppointments={pastAppointments}
        cancelledAppointments={cancelledAppointments}
        expiredAppointments={expiredAppointments}
      />
      <ScrollArea className="col-start-3 bg-secondary">
        <div className="bg-secondary p-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl font-bold text-foreground">
                Good Morning, Dr. {user?.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Hello there! Here's what's happening with your practice. How can
                we assist you today?
              </p>
            </div>

            <Button variant="white" className="space-x-2 rounded-full">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <span className="text-primary">
                {format(new Date(), "MMMM do, yyyy")}
              </span>
            </Button>
          </div>

          <StatsCards />

          <div className="mt-8">
            <div className="grid gap-8 lg:grid-cols-3 xl:grid-cols-8">
              <div className="rounded-xl border bg-white p-6 lg:col-span-8">
                {/* @ts-ignore */}
                <DataTable columns={columns} data={patients} />
              </div>

              <div className="rounded-xl border bg-white p-6 lg:col-span-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Gender Stats
                  </h2>

                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#2952ff]"></span>
                    <span className="text-xs text-muted-foreground">Male</span>

                    <span className="h-2 w-2 rounded-full bg-[#93e7fe]"></span>
                    <span className="text-xs text-muted-foreground">
                      Female
                    </span>
                  </div>
                </div>
                <GenderBarChart />
              </div>

              <div className="rounded-xl border bg-white p-6 lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Patients Overview
                  </h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>

                <div className="flex items-center justify-around">
                  <PatientsOverviewChart />

                  <div className="flex items-center">
                    <div className="ml-4 flex flex-col space-y-2.5">
                      {piedata.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span
                            className="h-2.5 w-5 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          ></span>
                          <span className="text-muted-foreground">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="ml-4 flex flex-col space-y-2.5">
                      {piedata.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
