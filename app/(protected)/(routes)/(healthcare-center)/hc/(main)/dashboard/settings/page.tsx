import React from "react";

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

export default function HealthcareCenterSettingsPage() {
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
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchButton />
        <HealthcareCenterButton />
      </Header>
    </div>
  );
}