"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getHealthcareProvidersByParams } from "@/actions/search";
import { HealthCareCenter, User } from "@prisma/client";
import { GlobeIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { VerifiedAccountBadge } from "./healthcare-provider/verified-account-badge";
import { HealthcareProvidersList } from "./healthcare-providers-list";

interface HealthcareCenterCardProps {
  healthcareCenter: HealthCareCenter & { user: User } & {
    healthCareProviders: Awaited<
      ReturnType<typeof getHealthcareProvidersByParams>
    >;
  };
}

export function HealthcareCenterCard({
  healthcareCenter,
}: HealthcareCenterCardProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 flex-shrink-0 rounded-lg bg-gray-200">
            <Image
              src={healthcareCenter.user.image || "/placeholder.svg"}
              alt={healthcareCenter.user.name}
              className="h-full rounded-lg object-cover"
              style={{ objectPosition: "center" }}
              width={500}
              height={500}
            />
            {!!healthcareCenter?.user.emailVerified && (
              <VerifiedAccountBadge className="-bottom-2 -end-2" />
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <h2 className="text-lg font-semibold">
              {healthcareCenter.user.name}
            </h2>

            <div className="flex items-center gap-1.5">
              <QuestionMarkCircledIcon className="h-4 w-4 text-blue-600" />
              <p className="max-w-[750px] truncate text-sm text-muted-foreground">
                {healthcareCenter.description || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <GlobeIcon className="h-4 w-4 text-blue-600" />
              <p className="max-w-[250px] truncate text-sm text-muted-foreground">
                {healthcareCenter.website || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold">Healthcare Providers</h3>
          <HealthcareProvidersList
            columns={[]}
            // @ts-ignore
            data={healthcareCenter.healthCareProviders || []}
          />
        </div>
      </div>
    </div>
  );
}
