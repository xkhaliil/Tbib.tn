import React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
