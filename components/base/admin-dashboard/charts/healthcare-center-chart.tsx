"use client";

import React from "react";

import { getHealthCareCentersByMonth } from "@/actions/healthcare-center";
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

interface AdminHealthcareCenterChartDashboardProps {
  users: Awaited<ReturnType<typeof getHealthCareCentersByMonth>>;
}
export default function AdminHealthcareCenterChartDashboard({
  users,
}: AdminHealthcareCenterChartDashboardProps) {
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
        <Line
          type="monotone"
          dataKey="totalUsers"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Healthcare Centers"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
