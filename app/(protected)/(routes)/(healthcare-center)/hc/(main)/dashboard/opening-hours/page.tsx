import React from "react";

import { getCurrentSession, getHealthcareCenterByUserId } from "@/actions/auth";
import { getOpeningHoursByHealthcareCenterId } from "@/actions/opening-hours";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HealthcareCenterButton } from "@/components/auth/healthcare-center-button";
import { Header } from "@/components/base/healthcare-center/dashboard/header";
import { SearchButton } from "@/components/base/healthcare-center/dashboard/search-button";
import {
  MobileSidebar,
  Sidebar,
} from "@/components/base/healthcare-center/dashboard/sidebar";
import { ManageOpeningHoursForm } from "@/components/base/healthcare-center/forms/manage-opening-hours-form";

export default async function HealthcareCenterOpeningHoursPage() {
  const authenticatedUser = await getCurrentSession();
  const healthcareCenter = await getHealthcareCenterByUserId(
    authenticatedUser?.id as string,
  );
  const openingHours = await getOpeningHoursByHealthcareCenterId(
    healthcareCenter?.id,
  );
  return (
    <div>
      <Sidebar />
      <Header>
        <MobileSidebar />
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/hc/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/hc/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Opening Hours</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchButton />
        <HealthcareCenterButton />
      </Header>

      <main className="pb-12 lg:ml-20 lg:mr-8">
        <ManageOpeningHoursForm openingHours={openingHours} />
      </main>
    </div>
  );
}
