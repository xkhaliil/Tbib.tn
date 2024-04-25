"use client";

import React from "react";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

interface MapClientProps {
  locations?: { name: string; coordinates: [number, number] }[];
}

const Map = dynamic(() => import("./map").then((mod) => mod.Map), {
  loading: () => <Skeleton className="h-[800px] rounded-lg" />,
  ssr: false,
});

export function MapClient({ locations }: MapClientProps) {
  return (
    <div className="w-full rounded-lg">
      <Map locations={locations} />
    </div>
  );
}
