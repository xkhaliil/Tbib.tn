import React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarLinkProps {
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

export function SidebarLink({
  label,
  icon: Icon,
  href,
  isActive,
}: SidebarLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-blue-600",
              isActive && "bg-blue-600 text-white",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                isActive && "text-white group-hover:text-white",
              )}
            />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
