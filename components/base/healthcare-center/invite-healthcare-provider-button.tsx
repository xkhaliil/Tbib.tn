"use client";

import React from "react";

import { PlusCircledIcon } from "@radix-ui/react-icons";

import { useInviteHealthcareProviderDialog } from "@/hooks/use-invite-healthcare-provider-dialog";

import { Button } from "@/components/ui/button";

export function InviteHealthcareProviderButton() {
  const inviteHealthcareProviderDialog = useInviteHealthcareProviderDialog();
  return (
    <Button
      variant="blue"
      size="sm"
      className="h-7 gap-1"
      onClick={() => inviteHealthcareProviderDialog.setOpen(true)}
    >
      <PlusCircledIcon className="h-3.5 w-3.5" />
      <span className="sm:whitespace-nowrap">Invite Team Member</span>
    </Button>
  );
}
