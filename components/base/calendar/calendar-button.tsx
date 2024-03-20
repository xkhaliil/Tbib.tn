"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalendarButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}

export function CalendarButton({
  children,
  onClick,
  label,
  className,
}: CalendarButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            type="button"
            onClick={onClick}
            className={cn("", className)}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
