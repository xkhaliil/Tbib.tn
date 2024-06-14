import React from "react";

import Link from "next/link";
import { getCurrentSession, getHealthcareCenterByUserId } from "@/actions/auth";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthcareCenterButton } from "@/components/auth/healthcare-center-button";
import { NotificationsCard } from "@/components/base/healthcare-center/dashboard/cards/notifications-card";
import { OpeningHoursCard } from "@/components/base/healthcare-center/dashboard/cards/opening-hours-card";
import { TeamCard } from "@/components/base/healthcare-center/dashboard/cards/team-card";
import { TodayAppointmentsCard } from "@/components/base/healthcare-center/dashboard/cards/today-appointments-card";
import { WeeklyAppointmentsCard } from "@/components/base/healthcare-center/dashboard/cards/weekly-appointments-card";
import { Header } from "@/components/base/healthcare-center/dashboard/header";
import { SearchButton } from "@/components/base/healthcare-center/dashboard/search-button";
import {
  MobileSidebar,
  Sidebar,
} from "@/components/base/healthcare-center/dashboard/sidebar";
import { MonthlyAppointmentsDataTable } from "@/components/base/healthcare-center/data-tables/monthly-appointments";
import { TodayAppointmentsDataTable } from "@/components/base/healthcare-center/data-tables/today-appointments";
import { WeeklyAppointmentsDataTable } from "@/components/base/healthcare-center/data-tables/weekly-appointments";

export default async function HealthcareCenterDashboardPage() {
  const authenticatedUser = await getCurrentSession();
  const healthcareCenter = await getHealthcareCenterByUserId(
    authenticatedUser?.id as string,
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
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchButton />
        <HealthcareCenterButton />
      </Header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:ml-14 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <TeamCard />
            <WeeklyAppointmentsCard healthCareCenterId={healthcareCenter?.id} />
            <TodayAppointmentsCard healthCareCenterId={healthcareCenter?.id} />
          </div>

          <Tabs defaultValue="today">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="blue"
                  className="h-7 gap-1.5"
                  asChild
                >
                  <Link href="/hc/dashboard/appointments">View All</Link>
                </Button>
              </div>
            </div>
            <TabsContent value="today">
              <TodayAppointmentsDataTable
                healthCareCenterId={healthcareCenter?.id}
              />
            </TabsContent>
            <TabsContent value="week">
              <WeeklyAppointmentsDataTable
                healthCareCenterId={healthcareCenter?.id}
              />
            </TabsContent>
            <TabsContent value="month">
              <MonthlyAppointmentsDataTable
                healthCareCenterId={healthcareCenter?.id}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid gap-4">
          <OpeningHoursCard healthcareCenter={healthcareCenter} />
          <NotificationsCard />
        </div>
      </main>
    </div>
  );
}
