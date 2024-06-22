import React from "react";

import Link from "next/link";
import { getCurrentSession } from "@/actions/auth";
import { Role, User } from "@prisma/client";
import { InfoIcon, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ActiveText } from "../active-text";
import { UserAvatar } from "../user-avatar";

interface ChatTopbarProps {
  selectedUser: User | undefined;
}

export async function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  const currentUser = await getCurrentSession();
  return (
    <div className="flex h-16 w-full items-center justify-between border-b bg-white p-4">
      <div className="flex items-center gap-2">
        <UserAvatar selectedUser={selectedUser} />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{selectedUser?.name}</span>
          <ActiveText user={selectedUser} />
        </div>
      </div>

      <div className="flex items-center">
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
          )}
        >
          <InfoIcon className="h-5 w-5" />
        </Link>

        {currentUser?.role === Role.HEALTHCARE_PROVIDER && (
          <>
            <Separator orientation="vertical" className="mx-1.5 h-6" />

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <VideoIcon className="h-5 w-5" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
