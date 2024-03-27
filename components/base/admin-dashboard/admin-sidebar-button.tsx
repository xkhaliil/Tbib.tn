"use client";

import React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface SidebarButtonProps {
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

export function AdminSidebarButton({
  label,
  icon: Icon,
  href,
  isActive,
}: SidebarButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-blue-600",
        isActive && "bg-muted font-semibold text-blue-600",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
