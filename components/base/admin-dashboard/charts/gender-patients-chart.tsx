"use client";

import * as React from "react";

import { getPatientsByGender } from "@/actions/patient";

type GenderChartType = Awaited<ReturnType<typeof getPatientsByGender>>;
interface GenderChartProps {
  patients: GenderChartType;
}
export function PatientGenderChart({ patients }: GenderChartProps) {
  return <></>;
}
