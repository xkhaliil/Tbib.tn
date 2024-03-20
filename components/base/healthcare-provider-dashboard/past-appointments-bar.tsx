import React from "react";

import { Badge } from "@/components/ui/badge";

export function PastAppointmentsBar() {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-secondary px-4">
      <p className="text-xs text-muted-foreground">Past Appointments</p>
      <Badge variant="white" className="text-[10px] uppercase">
        Last Week
      </Badge>
    </div>
  );
}
