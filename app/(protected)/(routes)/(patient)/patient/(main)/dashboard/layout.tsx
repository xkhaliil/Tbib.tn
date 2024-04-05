import React from "react";

import { requireAuth } from "@/actions/auth";
import { Role } from "@prisma/client";

import { Unauthorized } from "@/components/auth/unauthorized";
import { Navbar } from "@/components/base/patient-dashboard/navbar";
import { Container } from "@/components/container";

interface PatientDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function PatientDashboardLayout({
  children,
}: PatientDashboardLayoutProps) {
  const { authorized } = await requireAuth(Role.PATIENT);

  if (!authorized) return <Unauthorized />;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Container className="px-0 sm:px-0 md:px-6">{children}</Container>
      </main>
    </div>
  );
}
