import React from "react";

import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  User,
} from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServicesCardProps {
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

export function ServicesCard({ healthcareProvider }: ServicesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>
            Services & Expertises of Dr. {healthcareProvider?.user.name}
          </CardTitle>
          <CardDescription>
            Here are the services and expertises of the healthcare provider.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {healthcareProvider?.services.length === 0 && (
            <p className="text-sm">No services available</p>
          )}
          {healthcareProvider?.services.map(
            (service, idx) =>
              service && (
                <Badge
                  key={idx}
                  variant="info"
                  className="truncate px-5 py-2.5"
                >
                  {service}
                </Badge>
              ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
