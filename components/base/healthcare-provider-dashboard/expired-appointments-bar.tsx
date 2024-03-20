import React from "react";

export function ExpiredAppointmentsBar() {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-secondary px-4">
      <p className="text-xs text-muted-foreground">Expired Appointments</p>
    </div>
  );
}
