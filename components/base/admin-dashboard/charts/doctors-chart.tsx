"use client";

import React from "react";

import { getHealthcareProvidersByMonth } from "@/actions/healthcare-provider";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthcareProvidersChartProps {
  users: Awaited<ReturnType<typeof getHealthcareProvidersByMonth>>;
}

export function HealthcareProvidersChart({
  users,
}: HealthcareProvidersChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Healthcare Providers</CardTitle>
      </CardHeader>
      <CardContent className="pl-0.5">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={users}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalUsers"
              name="Healthcare providers"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
