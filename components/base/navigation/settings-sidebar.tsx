"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

interface SidebarButtonProps {
  items: { label: string; href: string }[];
}

export function SettingsSidebar({ items }: SidebarButtonProps) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col space-y-2.5 px-4 py-6">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
