import React from "react";

import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import { getHealthcareProviderPatients } from "@/actions/healthcare-provider";

import { columns } from "@/components/base/healthcare-provider-dashboard/all-patients-data-table/columns";
import { DataTable } from "@/components/base/healthcare-provider-dashboard/all-patients-data-table/data-table";

export async function AllPatientsDataTable() {
  const currentUser = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(
    currentUser?.id,
  );
  const patients = await getHealthcareProviderPatients(healthcareProvider?.id);
  return patients && <DataTable columns={columns} data={patients} />;
}
