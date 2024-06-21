"use client";

import React from "react";

import {
  getHealthCareCentersByParams,
  getHealthcareProvidersByParams,
} from "@/actions/search";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapClient } from "@/components/base/results-page/map-client";
import { Container } from "@/components/container";

import { HealthcareCenterCard } from "../healthcare-center-card";
import { HealthcareProviderCard } from "../healthcare-provider-card";

interface SearchClientProps {
  healthcareProviders: Awaited<
    ReturnType<typeof getHealthcareProvidersByParams>
  >;
  healthcareCenters: Awaited<ReturnType<typeof getHealthCareCentersByParams>>;
}

export function SearchClient({
  healthcareProviders,
  healthcareCenters,
}: SearchClientProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    "healthcare-providers",
  );

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  let content = null;

  if (activeTab === "healthcare-providers") {
    content = (
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-6">
          {healthcareProviders.map((healthcareProvider) => (
            <HealthcareProviderCard
              key={healthcareProvider.id}
              healthcareProvider={healthcareProvider}
            />
          ))}
        </div>
      </div>
    );
  } else if (activeTab === "healthcare-centers") {
    content = (
      <div className="flex flex-col gap-6">
        {healthcareCenters.map((healthcareCenter) => (
          <HealthcareCenterCard
            key={healthcareCenter.id}
            healthcareCenter={healthcareCenter}
          />
        ))}

        {healthcareCenters.length === 0 && (
          <div className="flex h-60 items-center justify-center rounded-xl border bg-white">
            <p className="text-center text-muted-foreground">
              No healthcare centers found.
            </p>
          </div>
        )}
      </div>
    );
  }
  return (
    <Container className="max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="font-semibold">Search Results</h1>
          <p className="text-sm text-muted-foreground">
            {healthcareProviders.length} healthcare providers found.
          </p>
        </div>
        <Tabs defaultValue="healthcare-providers">
          <TabsList className="h-14 gap-2.5 p-0 px-2.5">
            <TabsTrigger
              value="healthcare-providers"
              className="w-full py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              onClick={() => handleChangeTab("healthcare-providers")}
            >
              Healthcare Providers
            </TabsTrigger>
            <TabsTrigger
              value="healthcare-centers"
              className="w-full py-2 data-[state=active]:bg-blue-600/90 data-[state=active]:text-white"
              onClick={() => handleChangeTab("healthcare-centers")}
            >
              Healthcare Centers
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-[950px_1fr] gap-6">
          {content}

          {healthcareProviders.length > 0 && (
            <MapClient
              locations={healthcareProviders
                .filter(
                  (hp) =>
                    hp.officeLatitude !== null && hp.officeLongitude !== null,
                )
                .map((hp) => ({
                  name: `Dr. ${hp.user.name}`,
                  coordinates: [hp.officeLatitude!, hp.officeLongitude!],
                }))}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
