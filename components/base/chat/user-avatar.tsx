"use client";

import React from "react";

import { User } from "@prisma/client";

import { cn } from "@/lib/utils";

import { useActiveList } from "@/hooks/use-active-list";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  selectedUser: User | undefined;
  className?: string;
}

export function UserAvatar({ selectedUser, className }: UserAvatarProps) {
  const { members } = useActiveList();

  const isActive = members.indexOf(selectedUser?.email!) !== -1;
  return (
    <div className="relative">
      <Avatar className={cn("h-9 w-9", className)}>
        <AvatarImage
          src={selectedUser?.image ?? "/placeholder.svg"}
          alt={selectedUser?.name}
          width={6}
          height={6}
        />
        <AvatarFallback>
          {selectedUser?.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {isActive && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
}
