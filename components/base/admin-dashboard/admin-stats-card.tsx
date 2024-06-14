import React from "react";

import { getAllPatients } from "@/actions/patient";
import { HealthcareCenter, HealthCareProvider, Patient } from "@/types";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number | undefined;
  data:
    | Awaited<ReturnType<typeof getAllPatients>>
    | HealthCareProvider[]
    | HealthcareCenter[]
    | undefined;
  className?: string;
}

export function AdminStatsCard({
  icon: Icon,
  title,
  value,
  data,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="relative z-10">
        <div className="flex justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white">
            <Icon className="h-6 w-6 stroke-blue-600 text-blue-600" />
          </div>
        </div>
        <div className="mt-2.5">
          <h3 className="text-base">{title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold text-blue-600">{value}</p>
            <div className="flex -space-x-2 overflow-hidden">
              {data?.slice(0, 3).map((user) => (
                <Avatar className="h-7 w-7" key={user?.id}>
                  <AvatarImage
                    src={user?.user.image || "/placeholder.svg"}
                    alt={user?.user.name || "Image"}
                  />
                  <AvatarFallback>{user?.user.name[0] || "U"}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-white to-white backdrop-blur-lg" />
    </div>
  );
}
