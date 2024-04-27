"use client";

import React from "react";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  loading: () => <Skeleton className="h-[800px] rounded-lg" />,
  ssr: false,
});

interface MapClientProps {
  center?: number[];
  zoom?: number;
}

export function MapClient({ center, zoom }: MapClientProps) {
  return (
    <div className="w-full rounded-lg">
      <Map center={center} zoom={zoom} />
    </div>
  );
}
