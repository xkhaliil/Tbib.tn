import React from "react";

import Link from "next/link";
import {
  getPatientRecentMedicalDocuments,
  getPatientTotalAppointments,
  getPatientTotalConsultations,
  getPatientTotalMedicalDocuments,
} from "@/actions/patient";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatDistance } from "date-fns";
import {
  ArrowUpRightIcon,
  FileIcon,
  FileTextIcon,
  StethoscopeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentVisitsCard } from "@/components/base/patient/dashboard/cards/recent-visits-card";
import { StatisticsCard } from "@/components/base/patient/dashboard/cards/statistics-card";

export default async function PatientDashboardPage() {
  const totalAppointments = await getPatientTotalAppointments();
  const totalConsultations = await getPatientTotalConsultations();
  const totalMedicalDocuments = await getPatientTotalMedicalDocuments();
  const medicalDocuments = await getPatientRecentMedicalDocuments();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
        <StatisticsCard
          title="Total Appointments"
          description="Total number of appointments"
          icon={CalendarIcon}
          value={totalAppointments}
        />
        <StatisticsCard
          title="Total Consultations"
          description="Total number of consultations"
          icon={StethoscopeIcon}
          value={totalConsultations}
        />
        <StatisticsCard
          title="Total Medical Documents"
          description="Total number of medical documents"
          icon={FileIcon}
          value={totalMedicalDocuments}
        />
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
        <RecentVisitsCard />
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Medical Documents</CardTitle>
              <CardDescription>
                Recent medical documents uploaded by you.
              </CardDescription>
            </div>
            <Button asChild variant="blue" size="sm" className="ml-auto gap-1">
              <Link href="/patient/dashboard/medical-documents">
                View All
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {medicalDocuments?.map((document) => (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                  >
                    <FileTextIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                </div>

                <div className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-sm font-semibold">{document.name}</h1>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      Uploaded on{" "}
                      {format(new Date(document.createdAt), "MMM dd, yyyy")} (
                      {formatDistance(new Date(document.createdAt), new Date())}{" "}
                      ago)
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {medicalDocuments?.length === 0 && (
              <div className="text-center text-sm text-muted-foreground">
                No recent medical documents.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
