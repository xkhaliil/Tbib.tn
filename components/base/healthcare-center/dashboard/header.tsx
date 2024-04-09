import React from "react";

import { cn } from "@/lib/utils";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <div className={cn("flex flex-col sm:gap-4 sm:py-4 sm:pl-14", className)}>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {children}
      </header>
    </div>
  );
}
