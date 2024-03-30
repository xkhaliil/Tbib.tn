import React from "react";

import { requireAuth } from "@/actions/auth";
import { Role } from "@prisma/client";

import { Unauthorized } from "@/components/auth/unauthorized";

interface HealthcareCenterDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function HealthcareCenterDashboardLayout({
  children,
}: HealthcareCenterDashboardLayoutProps) {
  const { authorized } = await requireAuth(Role.HEALTHCARE_CENTER);

  if (!authorized) return <Unauthorized />;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {children}
    </div>
  );
}
