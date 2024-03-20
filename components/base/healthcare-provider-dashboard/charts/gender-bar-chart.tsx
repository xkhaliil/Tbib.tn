"use client";

import React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const genderDataPerMonth = [
  {
    month: "Jan",
    maleValue: 6,
    femaleValue: 9,
  },
  {
    month: "Feb",
    maleValue: 16,
    femaleValue: 5,
  },
  {
    month: "Mar",
    maleValue: 6,
    femaleValue: 6,
  },
  {
    month: "Apr",
    maleValue: 17,
    femaleValue: 3,
  },
  {
    month: "May",
    maleValue: 4,
    femaleValue: 8,
  },
  {
    month: "Jun",
    maleValue: 5,
    femaleValue: 6,
  },
  {
    month: "Jul",
    maleValue: 6,
    femaleValue: 9,
  },
  {
    month: "Aug",
    maleValue: 16,
    femaleValue: 5,
  },
  {
    month: "Sep",
    maleValue: 6,
    femaleValue: 6,
  },
  {
    month: "Oct",
    maleValue: 17,
    femaleValue: 3,
  },
  {
    month: "Nov",
    maleValue: 4,
    femaleValue: 8,
  },
  {
    month: "Dec",
    maleValue: 5,
    femaleValue: 6,
  },
];

export function GenderBarChart() {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart
        data={genderDataPerMonth}
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
        <Bar dataKey="maleValue" fill="#2952ff" stackId="a" />
        <Bar
          dataKey="femaleValue"
          radius={[5, 5, 0, 0]}
          fill="#93e7fe"
          stackId="a"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
