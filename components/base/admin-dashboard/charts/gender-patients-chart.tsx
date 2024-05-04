"use client";

import * as React from "react";

import { getPatientsByGender } from "@/actions/patient";
import { PieChart } from "@mui/x-charts/PieChart";

type GenderChartType = Awaited<ReturnType<typeof getPatientsByGender>>;
interface GenderChartProps {
  patients: GenderChartType;
}
export function PatientGenderChart({ patients }: GenderChartProps) {
  return (
    <>
      <PieChart series={patients} width={400} height={200} />
    </>
  );
}
