import React from "react";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { FileIcon } from "lucide-react";

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
import { Header } from "@/components/base/healthcare-center/dashboard/header";
import { SearchButton } from "@/components/base/healthcare-center/dashboard/search-button";
import {
  MobileSidebar,
  Sidebar,
} from "@/components/base/healthcare-center/dashboard/sidebar";
import { TeamMembersTable } from "@/components/base/healthcare-center/dashboard/team-members-table";

export default function HealthcareCenterTeamPage() {
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
              <BreadcrumbPage>Team</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchButton />
        <HealthcareCenterButton />
      </Header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:ml-14 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="members">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="requested">Requested</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <FileIcon className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap">Export</span>
              </Button>
              <Button variant="blue" size="sm" className="h-7 gap-1">
                <PlusCircledIcon className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap">Invite Team Member</span>
              </Button>
            </div>
          </div>
          <TabsContent value="members">
            <TeamMembersTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}