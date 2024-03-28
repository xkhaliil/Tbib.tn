import React from "react";

import { requireAuth } from "@/actions/auth";
import { Role } from "@prisma/client";

import { Unauthorized } from "@/components/auth/unauthorized";

interface HealthcareProviderDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function HealthcareProviderDashboardLayout({
  children,
}: HealthcareProviderDashboardLayoutProps) {
  const { authorized } = await requireAuth(Role.HEALTHCARE_PROVIDER);

  if (!authorized) return <Unauthorized />;

  return <> {children} </>;
}
