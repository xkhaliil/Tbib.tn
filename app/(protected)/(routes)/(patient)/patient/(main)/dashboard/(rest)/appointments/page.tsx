import React from "react";

import { getCurrentSession } from "@/actions/auth";
import {
  getPatientPastAppointments,
  getPatientUpcomingAppointments,
} from "@/actions/patient";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PastAppointmentCard } from "@/components/base/patient/appointments/past-appointment-card";
import { UpcomingAppointmentCard } from "@/components/base/patient/appointments/upcoming-appointment-card";

export default async function PatientAppointmentsPage() {
  const currentUser = await getCurrentSession();
  const pastAppointments = await getPatientPastAppointments(currentUser?.id);
  const upcomingAppointments = await getPatientUpcomingAppointments(
    currentUser?.id,
  );
  return (
    <div>
      <h1 className="pb-6 text-3xl font-semibold">My Appointments</h1>
      <Tabs defaultValue="past">
        <div className="flex items-center pb-4">
          <TabsList>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="past">
          {pastAppointments?.length === 0 && (
            <div className="flex h-[650px] flex-1 items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no past appointments
                </h3>
                <p className="text-sm text-muted-foreground">
                  Book an appointment with a doctor to get started
                </p>
                <Button variant="blue" className="mt-4">
                  Book an appointment
                </Button>
              </div>
            </div>
          )}
          {pastAppointments?.map((appointment) => (
            <div className="mb-4" key={appointment.id}>
              <PastAppointmentCard appointment={appointment} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="upcoming">
          {upcomingAppointments?.length === 0 && (
            <div className="flex h-[650px] flex-1 items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no upcoming appointments
                </h3>
                <p className="text-sm text-muted-foreground">
                  Book an appointment with a doctor to get started
                </p>
                <Button variant="blue" className="mt-4">
                  Book an appointment
                </Button>
              </div>
            </div>
          )}
          {upcomingAppointments?.map((appointment) => (
            <div className="mb-4" key={appointment.id}>
              <UpcomingAppointmentCard appointment={appointment} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
