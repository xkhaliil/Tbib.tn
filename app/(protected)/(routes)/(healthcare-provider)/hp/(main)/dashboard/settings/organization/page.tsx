import React from "react";

import Image from "next/image";
import Link from "next/link";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import { getHealthcareProviderHealthcareCenter } from "@/actions/healthcare-provider";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LeaveHealthcareCenterButton } from "@/components/base/healthcare-provider/leave-healthcare-center-button";

export default async function TeamSettingsPage() {
  const authenticatedUser = await getCurrentSession();
  const healthcareProvider = await getHealthcareProviderByUserId(
    authenticatedUser?.id,
  );
  const team = await getHealthcareProviderHealthcareCenter(
    healthcareProvider?.id,
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
            <BreadcrumbPage>Organization</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {!team && (
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
              You haven't joined an organization yet. Join an organization to
              collaborate with other healthcare providers.
            </p>
          </div>

          <Image
            src="/empty-state-background-pattern.svg"
            alt="empty-state"
            width={480}
            height={480}
            className="absolute bottom-auto left-auto right-auto top-0 z-10 inline-block h-full w-full object-cover align-middle"
          />
        </div>
      )}

      {team && (
        <Card className="mt-5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {team.user.name} ({team.healthCareProviders.length} members)
              </CardTitle>
              <CardDescription>{team.user.email}</CardDescription>
            </div>
            <LeaveHealthcareCenterButton
              healthcareProviderId={healthcareProvider?.id}
            />
          </div>
          <CardContent className="p-0">
            <div className="mt-4 grid grid-cols-1 gap-4">
              {team.healthCareProviders.map((member) => (
                <Card key={member.id} className="p-4 shadow-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={member.user.image || "/placeholder.svg"}
                        alt={member.user.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div className="grid gap-1">
                        <CardTitle>{member.user.name}</CardTitle>
                        <CardDescription>{member.user.email}</CardDescription>
                        <p className="text-xs text-muted-foreground">
                          {member.speciality}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
