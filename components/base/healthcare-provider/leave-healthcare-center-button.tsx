"use client";

import React from "react";

import { leaveHealthcareCenter } from "@/actions/healthcare-provider";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface LeaveHealthcareCenterButtonProps {
  healthcareProviderId: string | undefined;
}

export function LeaveHealthcareCenterButton({
  healthcareProviderId,
}: LeaveHealthcareCenterButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleLeaveHealthcareCenter = async () => {
    startTransition(() => {
      leaveHealthcareCenter(healthcareProviderId || "").then(() => {
        toast.success("Left healthcare center successfully");
      });
    });
  };
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLeaveHealthcareCenter}
      disabled={isPending}
    >
      {isPending && <Spinner className="mr-2" />}
      Leave organization
    </Button>
  );
}
