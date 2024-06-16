import React from "react";

import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  User,
} from "@prisma/client";
import { BadgeCheckIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingAndRefundsCardProps {
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

export function PricingAndRefundsCard({
  healthcareProvider,
}: PricingAndRefundsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>Pricing & Refunds</CardTitle>
          <CardDescription>
            Here are the pricing and refund policies.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="max-w-md list-inside space-y-1.5 text-muted-foreground">
          {healthcareProvider?.insurances.map((insurance) => (
            <li key={insurance} className="flex items-center text-sm">
              <BadgeCheckIcon className="me-2 h-5 w-5 flex-shrink-0 fill-green-500 text-white" />
              {insurance}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
