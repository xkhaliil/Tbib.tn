import React from "react";

import {
  getHealthcareProvidersByParams,
  SearchPageParams,
} from "@/actions/search";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DollarSignIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HealthcareProviderCard } from "@/components/base/healthcare-provider-card";
import { MapClient } from "@/components/base/results-page/map-client";
import { Container } from "@/components/container";
import { SearchResultsNavbar } from "@/components/search-results-navbar";

interface SearchPageProps {
  searchParams: SearchPageParams;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const healthcareProviders =
    await getHealthcareProvidersByParams(searchParams);

  return (
    <>
      <SearchResultsNavbar />
      <div className="w-full border-b bg-white py-6">
        <Container className="max-w-[1600px]">
          <div className="flex items-center space-x-4">
            <Button variant="white" size="sm" className="rounded-full">
              <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
              Disponibility
            </Button>
            <Button variant="white" size="sm" className="rounded-full">
              <DollarSignIcon className="mr-1.5 h-3.5 w-3.5" />
              Payment Options
            </Button>
            <Button variant="white" size="sm" className="rounded-full">
              Insurance
            </Button>
          </div>
        </Container>
      </div>
      <div className="w-full bg-muted/40 py-8">
        <Container className="max-w-[1600px]">
          <div className="flex flex-col gap-y-1">
            <h1 className="font-semibold">Search Results</h1>
            <p className="text-sm text-muted-foreground">
              {healthcareProviders.length} healthcare providers found.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-[950px_1fr] gap-6">
            <div className="grid grid-cols-1 gap-6">
              {healthcareProviders.map((healthcareProvider) => (
                <HealthcareProviderCard
                  key={healthcareProvider.id}
                  healthcareProvider={healthcareProvider}
                />
              ))}
            </div>

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
          </div>
        </Container>
      </div>
    </>
  );
}
