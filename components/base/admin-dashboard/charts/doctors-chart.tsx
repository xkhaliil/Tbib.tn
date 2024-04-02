"use client";

import React from "react";

import { getHealthcareProviderByMonth } from "@/actions/healthcare-provider";
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

interface AdminDoctorChartDashboardProps {
  users: Awaited<ReturnType<typeof getHealthcareProviderByMonth>>;
}

export default function AdminDoctorChartDashboard({
  users,
}: AdminDoctorChartDashboardProps) {
  return (
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
  );
}
