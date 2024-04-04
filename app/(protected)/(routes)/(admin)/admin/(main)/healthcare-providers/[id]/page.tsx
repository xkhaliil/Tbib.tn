import React from "react";

interface HealthcareProviderDetailsPageParams {
  params: {
    id: string;
  };
}

export default function HealthcareProviderDetailsPage({
  params,
}: HealthcareProviderDetailsPageParams) {
  return <div>{params.id}</div>;
}
