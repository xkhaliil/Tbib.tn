"use client";

import React from "react";

import { getPatientsByGenderPerMonth } from "@/actions/patient";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type GenderChartType = Awaited<ReturnType<typeof getPatientsByGenderPerMonth>>;

interface GenderChartProps {
  patients: GenderChartType;
}

export function GenderBarChart({ patients }: GenderChartProps) {
  console.log(patients);
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart
        data={patients}
        margin={{
          top: 10,
        }}
      >
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Males
                      </span>
                      <span className="font-semibold">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Females
                      </span>
                      <span className="font-semibold">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={25}
        />
        <Bar dataKey="totalMale" fill="#2952ff" stackId="a" />
        <Bar
          dataKey="totalFemale"
          radius={[5, 5, 0, 0]}
          fill="#93e7fe"
          stackId="a"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
