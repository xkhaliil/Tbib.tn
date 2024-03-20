import React from "react";

export function CancelledAppointmentsBar() {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-secondary px-4">
      <p className="text-xs text-muted-foreground">Cancelled Appointments</p>
    </div>
  );
}
