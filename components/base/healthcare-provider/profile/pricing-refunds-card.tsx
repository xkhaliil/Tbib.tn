import React from "react";

import { BadgeCheckIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PricingAndRefundsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start border-b bg-muted/50">
        <div className="grid gap-2">
          <CardTitle>Pricing & Refunds</CardTitle>
          <CardDescription>
            Here are the pricing and refund policies of the healthcare provider.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="max-w-md list-inside space-y-1.5 text-muted-foreground">
          <li className="flex items-center text-sm">
            <BadgeCheckIcon className="me-2 h-5 w-5 flex-shrink-0 fill-green-500 text-white" />
            Conventioned with the national health insurance.
          </li>
          <li className="flex items-center text-sm">
            <BadgeCheckIcon className="me-2 h-5 w-5 flex-shrink-0 fill-green-500 text-white" />
            CNAM cards are accepted.
          </li>
          <li className="flex items-center text-sm">
            <BadgeCheckIcon className="me-2 h-5 w-5 flex-shrink-0 fill-green-500 text-white" />
            Refund possible.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
