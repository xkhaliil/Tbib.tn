"use client";

import React from "react";

import { countUsersByMonth } from "@/actions/users";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TotalUsersChartProps {
  users: Awaited<ReturnType<typeof countUsersByMonth>>;
}

export function TotalUsersChart({ users }: TotalUsersChartProps) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={users}>
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
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        User
                      </span>
                      <span className="font-semibold">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="totalUsers"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-blue-600"
        />{" "}
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}
{
  /* */
}
