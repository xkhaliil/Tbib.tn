import {
  getAllAppointments,
  getAllTodayAppointments,
  getPastAppointments,
} from "@/actions/appointment";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import {
  getPatientsByGenderPerMonth,
  getPatientsWithAtLeastOneAppointment,
  getTotalAdultPatients,
  getTotalChildPatients,
  getTotalElderlyPatients,
  getTotalTeenPatients,
} from "@/actions/patient";
import { AppointmentStatus } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isEqual, startOfToday } from "date-fns";

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

const COLORS = ["#24a581", "#f991dc", "#fea25f", "#93e7fe"];

export default async function DashboardPage() {
  const user = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(user?.id);
  const patients = await getPatientsWithAtLeastOneAppointment(
    healthcareProvider?.id,
  );
  const appointments = await getAllAppointments(healthcareProvider?.id);
  const pastAppointments = await getPastAppointments(healthcareProvider?.id);
  const patientsByGenderPerMonth = await getPatientsByGenderPerMonth(
    healthcareProvider?.id,
  );

  const todayAppointments = await getAllTodayAppointments(
    healthcareProvider?.id,
  );

  const cancelledAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.CANCELLED,
  );

  const expiredAppointments = appointments?.filter(
    (appointment) => appointment.status === AppointmentStatus.EXPIRED,
  );

  const totalChildPatients = await getTotalChildPatients(
    healthcareProvider?.id,
  );
  const totalTeenPatients = await getTotalTeenPatients(healthcareProvider?.id);
  const totalAdultPatients = await getTotalAdultPatients(
    healthcareProvider?.id,
  );
  const totalElderlyPatients = await getTotalElderlyPatients(
    healthcareProvider?.id,
  );

  const piedata = [
    { name: "Child", value: totalChildPatients },
    { name: "Teen", value: totalTeenPatients },
    { name: "Adult", value: totalAdultPatients },
    { name: "Elderly", value: totalElderlyPatients },
  ];
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
      <ScrollArea className="col-start-3 bg-secondary">
        <div className="bg-secondary p-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl font-bold text-foreground">
                Good Morning, Dr. {user?.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Hello there! Here&apos;s what&apos;s happening with your
                practice. How can we assist you today?
              </p>
            </div>

            <Button variant="white" className="space-x-2 rounded-full">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <span className="text-primary">
                {format(new Date(), "MMMM do, yyyy")}
              </span>
            </Button>
          </div>

          <StatsCards healthcareProviderId={healthcareProvider?.id} />

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
                <GenderBarChart patients={patientsByGenderPerMonth} />
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
                  <PatientsOverviewChart
                    totalChildPatients={totalChildPatients}
                    totalTeenPatients={totalTeenPatients}
                    totalAdultPatients={totalAdultPatients}
                    totalElderlyPatients={totalElderlyPatients}
                  />

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
