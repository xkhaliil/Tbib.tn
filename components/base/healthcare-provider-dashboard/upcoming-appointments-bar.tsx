import React from "react";

import { Badge } from "@/components/ui/badge";

export function UpcomingAppointmentsBar() {
  return (
    <div className="flex items-center justify-between border-b bg-secondary px-4 py-[1.2rem]">
      <p className="text-xs text-muted-foreground">Upcoming Appointments</p>
      <Badge variant="white" className="text-[10px] uppercase">
        This Week
      </Badge>
    </div>
  );
}
