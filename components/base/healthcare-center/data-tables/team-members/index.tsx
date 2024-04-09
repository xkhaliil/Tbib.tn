import React from "react";

import { getCurrentSession, getHealthcareCenterByUserId } from "@/actions/auth";
import { getHealthcareProvidersByHealthcareCenterId } from "@/actions/healthcare-center";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function TeamMembersDataTable() {
  const currentUser = await getCurrentSession();
  const currentHealthcareCenter = await getHealthcareCenterByUserId(
    currentUser?.id,
  );
  const teamMembers = await getHealthcareProvidersByHealthcareCenterId(
    currentHealthcareCenter?.id,
  );
  return teamMembers && <DataTable columns={columns} data={teamMembers} />;
}
