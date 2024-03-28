import React from "react";

import { requireAuth } from "@/actions/auth";
import { Role } from "@prisma/client";

import { Unauthorized } from "@/components/auth/unauthorized";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { authorized } = await requireAuth(Role.ADMIN);

  if (!authorized) return <Unauthorized />;

  return <>{children}</>;
}
