"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarButtonProps {
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
  isActive?: boolean;
}

export function SidebarButton({
  label,
  icon: Icon,
  onClick,
  isActive,
}: SidebarButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group h-[45px] w-[45px] p-0",
              isActive && "border bg-muted",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 text-muted-foreground group-hover:text-foreground",
                isActive && "text-blue-600 group-hover:text-blue-600",
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="mb-8">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
