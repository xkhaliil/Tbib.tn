"use client";

import React from "react";

import { LogOutIcon, SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useManageAccountDialog } from "@/hooks/use-manage-account-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function UserButton() {
  const user = useCurrentUser();
  const manageAccountDialog = useManageAccountDialog();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-10 w-10 overflow-hidden rounded-full"
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
        align="start"
        side="right"
      >
        <div className="flex items-center">
          <Avatar>
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
          <Button
            variant="ghost"
            className="flex w-full justify-start px-2.5 text-muted-foreground"
            onClick={() => manageAccountDialog.setOpen(true)}
          >
            <SettingsIcon className="mr-7 h-4 w-4 text-muted-foreground" />
            Manage account
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
