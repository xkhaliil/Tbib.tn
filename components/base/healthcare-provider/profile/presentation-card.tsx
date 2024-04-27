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
import { Separator } from "@/components/ui/separator";

interface PresentationCardProps {
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

export function PresentationCard({
  healthcareProvider,
}: PresentationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>Presentation</CardTitle>
          <CardDescription>
            Here is a presentation of the healthcare provider.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-1.5">
          <h2 className="font-semibold tracking-tight">
            About Dr. {healthcareProvider?.user.name}
          </h2>
          <p className="text-sm">{healthcareProvider?.user.bio}</p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-1.5">
          <h2 className="font-semibold tracking-tight">Spoken Languages</h2>
          {healthcareProvider?.spokenLanguages.length ? (
            <p className="text-sm">
              {healthcareProvider?.spokenLanguages.join(", ")}
            </p>
          ) : (
            <p className="text-sm">No spoken languages</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
