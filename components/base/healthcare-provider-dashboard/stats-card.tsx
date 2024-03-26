import React from "react";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number | undefined;
  className?: string;
}

export function StatsCard({
  icon: Icon,
  title,
  value,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/50">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <div className="ml-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
