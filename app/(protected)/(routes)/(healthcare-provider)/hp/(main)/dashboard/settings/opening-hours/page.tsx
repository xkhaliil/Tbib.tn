import React from "react";

import Link from "next/link";
import { getCurrentSession, getHealthcareProviderById } from "@/actions/auth";
import { getOpeningHoursByProviderId } from "@/actions/opening-hours";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ManageOpeningHoursForm } from "@/components/base/healthcare-provider/forms/manage-opening-hours-form";

export default async function OpeningHoursSettingsPage() {
  const authenticatedUser = await getCurrentSession();
  const healthCareProvider = await getHealthcareProviderById(
    authenticatedUser?.id as string,
  );
  const openingHours = await getOpeningHoursByProviderId(
    healthCareProvider?.id as string,
  );
  return (
    <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/hp/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/hp/dashboard/settings">Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Opening Hours</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ManageOpeningHoursForm openingHours={openingHours} />
    </div>
  );
}
