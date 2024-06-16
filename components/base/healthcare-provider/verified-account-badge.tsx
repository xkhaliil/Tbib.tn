import React from "react";

import { BadgeCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerifiedAccountBadgeProps {
  className?: string;
}

export function VerifiedAccountBadge({ className }: VerifiedAccountBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <BadgeCheckIcon
            className={cn(
              "absolute bottom-0 end-0 size-7 fill-blue-600 text-white",
              className,
            )}
          />
        </TooltipTrigger>
        <TooltipContent side="top">Verified</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
