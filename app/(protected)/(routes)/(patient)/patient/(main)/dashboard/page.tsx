import React from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { FileIcon, StethoscopeIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentVisitsCard } from "@/components/base/patient/dashboard/cards/recent-visits-card";
import { StatisticsCard } from "@/components/base/patient/dashboard/cards/statistics-card";

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
        <StatisticsCard
          title="Total Appointments"
          description="Total number of appointments"
          icon={CalendarIcon}
          value="12"
        />
        <StatisticsCard
          title="Total Consultations"
          description="Total number of consultations"
          icon={StethoscopeIcon}
          value="5"
        />
        <StatisticsCard
          title="Total Medical Documents"
          description="Total number of medical documents"
          icon={FileIcon}
          value="3"
        />
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
        <RecentVisitsCard />
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Medical Documents</CardTitle>
            <CardDescription>
              Recent medical documents uploaded by you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              No recent medical documents.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
