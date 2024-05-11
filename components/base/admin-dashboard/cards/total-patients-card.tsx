import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TotalPatientsCardProps {
  total: number;
  increase: number;
  period: "week" | "month" | "year";
}

export function TotalPatientsCard({
  total,
  increase,
  period,
}: TotalPatientsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>
          This {period.charAt(0).toUpperCase() + period.slice(1)}
        </CardDescription>
        <CardTitle className="text-4xl text-blue-600">{total}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          +{increase}% from last {period}
        </div>
      </CardContent>
      <CardFooter>
        <Progress
          value={increase}
          aria-label={`${increase}% increase`}
          indicatorColor="bg-blue-600"
        />
      </CardFooter>
    </Card>
  );
}
