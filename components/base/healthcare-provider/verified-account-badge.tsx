import React from "react";

import { BadgeCheckIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function VerifiedAccountBadge() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <BadgeCheckIcon className="absolute bottom-0 end-0 size-7 fill-sky-600 text-white" />
        </TooltipTrigger>
        <TooltipContent side="top">Verified</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
