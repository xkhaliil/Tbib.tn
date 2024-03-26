"use client";

import React from "react";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Child", value: 55 },
  { name: "Teen", value: 15 },
  { name: "Adult", value: 30 },
  { name: "Elderly", value: 10 },
];

const COLORS = ["#24a581", "#f991dc", "#fea25f", "#93e7fe"];

export function PatientsOverviewChart() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <ResponsiveContainer width="35%" height={170}>
      <PieChart>
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {payload[0].name}
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
        <Pie data={data} dataKey="value" innerRadius={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
