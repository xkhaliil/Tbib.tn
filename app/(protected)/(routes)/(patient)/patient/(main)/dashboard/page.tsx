import React from "react";

import { PatientAccountSettings } from "@/components/patient-dashboard-components/account-settings.tsx/account-settings";
import { PatientDashboardNavbar } from "@/components/patient-dashboard-components/navbar/patient-dashboard-navbar";

export default function PatientDashboardPage() {
  return (
    <div>
      <PatientDashboardNavbar />
      <PatientAccountSettings />
    </div>
  );
}
