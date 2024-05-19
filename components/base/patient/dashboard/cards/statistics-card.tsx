import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  value: number | undefined;
}

export function StatisticsCard({
  title,
  description,
  icon: Icon,
  value,
}: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-blue-600">{value}</div>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
