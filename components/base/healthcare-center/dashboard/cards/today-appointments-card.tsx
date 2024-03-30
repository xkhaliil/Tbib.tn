import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TodayAppointmentsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Today</CardDescription>
        <CardTitle className="text-4xl">+3</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">Appointments</div>
      </CardContent>
    </Card>
  );
}
