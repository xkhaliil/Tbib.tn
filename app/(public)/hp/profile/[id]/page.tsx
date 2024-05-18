import React from "react";

import { getCurrentSession } from "@/actions/auth";
import { getHealthCareProviderUserAndOpeningHoursAndAbsencesById } from "@/actions/healthcare-provider";

import { Profile } from "@/components/base/healthcare-provider/profile";
import { Navbar } from "@/components/base/healthcare-provider/profile/navbar";

interface HealthcareProviderProfilePageProps {
  params: {
    id: string;
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
