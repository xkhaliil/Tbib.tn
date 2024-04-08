import React from "react";

import Link from "next/link";
import { getCurrentSession, getPatientById } from "@/actions/auth";
import { getPatientAppointments } from "@/actions/patient";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentVisitsTable } from "@/components/base/patient/dashboard/recent-visits-table";

export async function RecentVisitsCard() {
  const currentUser = await getCurrentSession();
  const visits = await getPatientAppointments(currentUser?.id);
  return (
    <Card className="xl:col-span-3">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Visits</CardTitle>
          <CardDescription>
            Recent visits to your practitioners.
          </CardDescription>
        </div>
        <Button asChild variant="blue" size="sm" className="ml-auto gap-1">
          <Link href="/patient/dashboard/appointments">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {visits && visits.length > 0 ? (
          <RecentVisitsTable visits={visits} />
        ) : (
          <div className="text-center text-muted-foreground">
            No recent visits.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
