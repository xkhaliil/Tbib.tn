import React from "react";

import { getCurrentSession } from "@/actions/auth";
import {
  getPatientPastAppointments,
  getPatientUpcomingAppointments,
} from "@/actions/patient";

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
            <p className="text-center text-muted-foreground">
              No past appointments
            </p>
          )}
          {pastAppointments?.map((appointment) => (
            <div className="mb-4" key={appointment.id}>
              <PastAppointmentCard appointment={appointment} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="upcoming">
          {upcomingAppointments?.length === 0 && (
            <p className="text-center text-muted-foreground">
              No upcoming appointments
            </p>
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
