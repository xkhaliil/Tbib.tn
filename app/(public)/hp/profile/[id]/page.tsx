import React from "react";

import type { Metadata } from "next";
import { getCurrentSession } from "@/actions/auth";
import { getHealthCareProviderUserAndOpeningHoursAndAbsencesById } from "@/actions/healthcare-provider";

import { Profile } from "@/components/base/healthcare-provider/profile";
import { Navbar } from "@/components/base/healthcare-provider/profile/navbar";

interface HealthcareProviderProfilePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: HealthcareProviderProfilePageProps): Promise<Metadata> {
  const healthcareProvider =
    await getHealthCareProviderUserAndOpeningHoursAndAbsencesById(id);
  return {
    title: `${healthcareProvider?.user.name}`,
  };
}

export default async function HealthcareProviderProfilePage({
  params,
}: HealthcareProviderProfilePageProps) {
  const healthcareProvider =
    await getHealthCareProviderUserAndOpeningHoursAndAbsencesById(params.id);
  const authenticatedUser = await getCurrentSession();
  return (
    <>
      <Navbar authenticatedUser={authenticatedUser} />
      <Profile healthcareProvider={healthcareProvider} />
    </>
  );
}
