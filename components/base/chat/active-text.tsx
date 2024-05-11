"use client";

import { User } from "@prisma/client";

import { useActiveList } from "@/hooks/use-active-list";

interface ActiveTextProps {
  user: User | undefined;
}

export function ActiveText({ user }: ActiveTextProps) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="text-xs text-muted-foreground">
      {isActive ? <span>Active now</span> : <span>Offline</span>}
    </div>
  );
}
