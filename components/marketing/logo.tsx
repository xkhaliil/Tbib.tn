import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={100}
      height={100}
      className={cn(className)}
    />
  );
}
