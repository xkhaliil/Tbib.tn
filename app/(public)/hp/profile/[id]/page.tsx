import React from "react";

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
  return (
    <>
      <Navbar />
      <Profile
        healthcareProvider={healthcareProvider}
      />
    </>
  );
}
