import React from "react";

import type { Metadata } from "next";
import Image from "next/image";
import { getCurrentSession } from "@/actions/auth";
import {
  getHealthCareCentersByParams,
  getHealthcareProvidersByParams,
  SearchPageParams,
} from "@/actions/search";

import { Filters } from "@/components/base/results-page/filters";
import { SearchClient } from "@/components/base/results-page/search-client";
import { Container } from "@/components/container";
import { SearchResultsNavbar } from "@/components/search-results-navbar";

interface SearchPageProps {
  searchParams: SearchPageParams;
}

export const metadata: Metadata = {
  title: "Search Results",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const currentUser = await getCurrentSession();
  const healthcareProviders =
    await getHealthcareProvidersByParams(searchParams);
  const healthcareCenters = await getHealthCareCentersByParams(searchParams);
  return (
    <>
      <SearchResultsNavbar currentUser={currentUser} />
      <div className="w-full border-b bg-white py-6">
        <Container className="max-w-[1600px]">
          <Filters />
        </Container>
      </div>
      <div className="w-full border-b bg-muted/40 py-8">
        <SearchClient
          healthcareProviders={healthcareProviders}
          healthcareCenters={healthcareCenters}
        />
      </div>

      {healthcareProviders.length === 0 && (
        <Container className="mt-6 max-w-[1600px]">
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8">
            <Image
              src="empty-placeholder.svg"
              alt="Empty placeholder"
              width={130}
              height={130}
            />

            <div className="flex flex-col items-center space-y-1">
              <h2 className="mt-4 text-base font-semibold text-blue-600">
                Looks like there are no healthcare providers matching your
                search criteria.
              </h2>

              <p className="text-sm text-muted-foreground">
                Try changing your search criteria or location.
              </p>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
