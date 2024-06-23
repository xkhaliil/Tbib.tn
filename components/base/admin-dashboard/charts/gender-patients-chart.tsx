"use client";

import * as React from "react";

import { getPatientsByGenderPerMonth } from "@/actions/patient";

type GenderChartType = Awaited<ReturnType<typeof getPatientsByGenderPerMonth>>;
interface GenderChartProps {
  patients: GenderChartType;
}
export function PatientGenderChart({ patients }: GenderChartProps) {
  return <></>;
}
