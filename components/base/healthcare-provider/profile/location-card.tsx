import React from "react";

import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  User,
} from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapClient } from "@/components/map-client";

interface LocationCardProps {
  healthcareProvider:
    | (HealthCareProvider & {
        user: User;
      } & {
        openingHours: OpeningHours[];
      } & {
        absences: Absence[];
      })
    | null;
}

export function LocationCard({ healthcareProvider }: LocationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>Map & access information</CardTitle>
          <CardDescription>
            Here you can find the location of the healthcare provider and the
            access information.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <h2 className="font-semibold tracking-tight">Office Address</h2>
            <p className="text-sm">{healthcareProvider?.officeAddress}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold tracking-tight">Useful Information</h2>
            <p className="text-sm">
              You can find the healthcare provider at the following address.
            </p>
          </div>
        </div>

        <MapClient
          center={[
            healthcareProvider?.officeLatitude || 0,
            healthcareProvider?.officeLongitude || 0,
          ]}
          zoom={16}
        />
      </CardContent>
    </Card>
  );
}
