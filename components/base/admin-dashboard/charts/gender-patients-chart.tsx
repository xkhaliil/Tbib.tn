"use client";

import React from "react";

import { getPatientNameGender } from "@/actions/patient";
import { DonutChart, Legend } from "@tremor/react";

type GenderChartType = Awaited<ReturnType<typeof getPatientNameGender>>;
interface GenderChartProps {
  patients: GenderChartType;
}
export function PatientGenderChart({ patients }: GenderChartProps) {
  return (
    <>
      <div className="flex items-center justify-center space-x-6">
        <DonutChart
          data={patients}
          category="value"
          index="gender"
          colors={["blue", "violet"]}
          className="w-40"
        />
        <Legend
          categories={["Male", "Female"]}
          colors={["blue", "violet"]}
          className="max-w-xs"
        />
      </div>
    </>
  );
}
