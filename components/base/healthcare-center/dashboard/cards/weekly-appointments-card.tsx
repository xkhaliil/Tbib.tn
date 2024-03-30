import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WeeklyAppointmentsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">+12</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">Appointments</div>
      </CardContent>
    </Card>
  );
}
