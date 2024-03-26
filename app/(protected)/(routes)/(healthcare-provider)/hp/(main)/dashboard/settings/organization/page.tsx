import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Users2Icon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function TeamSettingsPage() {
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
            <BreadcrumbPage>Organization</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative z-10 mt-8 flex flex-col items-center overflow-hidden rounded-xl border px-12 py-6 text-center shadow-sm">
        <div className="z-20 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted text-blue-600 shadow">
            <Users2Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-3xl">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Organization
          </h3>
          <p className="text-muted-foreground">
            You haven't joined an organization yet. You can request to join a
            team to collaborate with your colleagues.
          </p>
        </div>

        <Button variant="outline" size="sm" className="relative z-20 mt-4">
          Request to join an organization
        </Button>

        <Image
          src="/empty-state-background-pattern.svg"
          alt="empty-state"
          width={480}
          height={480}
          className="absolute bottom-auto left-auto right-auto top-0 z-10 inline-block h-full w-full object-cover align-middle"
        />
      </div>
    </div>
  );
}
