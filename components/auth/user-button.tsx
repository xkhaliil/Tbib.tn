"use client";

import React from "react";

import Link from "next/link";
import { Role } from "@prisma/client";
import { LayoutDashboard, LogOutIcon, SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserButtonProps {
  side?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function UserButton({
  side = "right",
  align = "start",
}: UserButtonProps) {
  const user = useCurrentUser();

  let href: string;
  let href2: string = "/patient/dashboard";

  if (user?.role === Role.PATIENT) {
    href = "/patient/dashboard/settings";
  } else if (user?.role === Role.HEALTHCARE_PROVIDER) {
    href = "/hp/dashboard/settings";
  } else if (user?.role === Role.HEALTHCARE_CENTER) {
    href = "/hc/dashboard/settings";
  } else {
    href = "/admin/dashboard/settings";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-9 w-9 overflow-hidden rounded-full"
          variant="ghost"
        >
          <Avatar>
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || undefined}
            />

            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="mb-4 w-[350px] rounded-xl shadow-xl"
        align={align}
        side={side}
      >
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name as string} />
            ) : (
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="ml-4 flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {user?.name}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col space-y-1">
          {user?.role === Role.PATIENT && (
            <Button
              variant="ghost"
              className="flex w-full justify-start px-2.5 text-muted-foreground"
              asChild
            >
              <Link href={href2}>
                <LayoutDashboard className="mr-7 h-4 w-4 text-muted-foreground" />
                Dashboard
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            className="flex w-full justify-start px-2.5 text-muted-foreground"
            asChild
          >
            <Link href={href}>
              <SettingsIcon className="mr-7 h-4 w-4 text-muted-foreground" />
              Manage account
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="flex w-full justify-start px-2.5 text-muted-foreground"
            onClick={() => signOut()}
          >
            <LogOutIcon className="mr-7 h-4 w-4 text-muted-foreground" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
