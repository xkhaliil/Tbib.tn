import React from "react";

import { fetchTodayAppointments } from "@/actions/appointment";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function TodayAppointmentsCard() {
  const todayAppointments = await fetchTodayAppointments();
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Today</CardDescription>
        <CardTitle className="text-4xl">{todayAppointments?.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">Appointments</div>
      </CardContent>
    </Card>
  );
}
