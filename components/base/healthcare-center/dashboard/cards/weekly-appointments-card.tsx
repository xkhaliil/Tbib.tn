import React from "react";

import { fetchWeeklyAppointments } from "@/actions/appointment";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function WeeklyAppointmentsCard() {
  const weeklyAppointments = await fetchWeeklyAppointments();
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">{weeklyAppointments?.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">Appointments</div>
      </CardContent>
    </Card>
  );
}
