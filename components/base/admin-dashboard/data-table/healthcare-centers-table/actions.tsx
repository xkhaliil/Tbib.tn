"use client";

import React from "react";

import { useRouter } from "next/navigation";
import {
  deleteHealthcareCenter,
  verifyHealthcareCenter,
} from "@/actions/admin";
import { User } from "@prisma/client";
import { CheckIcon, EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type HealthcareCenter = {
  id: string;
  user: User;
  website: string | null;
  accountVerified: boolean;
  verificationDocuments: string[];
};

interface HealthcareCentersDataTableActionsProps {
  healthcareCenter: HealthcareCenter;
}

export function HealthcareCentersDataTableActions({
  healthcareCenter,
}: HealthcareCentersDataTableActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleVerify = (id: string) => {
    startTransition(() => {
      verifyHealthcareCenter(id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  const handleDelete = (id: string) => {
    startTransition(() => {
      deleteHealthcareCenter(id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <div className="flex items-center gap-x-4">
      <Button
        size="sm"
        variant="outline"
        className="gap-1"
        onClick={() =>
          router.push(`/admin/healthcare-providers/${healthcareCenter.id}`)
        }
      >
        <EyeOpenIcon className="h-4 w-4" />
        <span>View Details</span>
      </Button>
      <Button
        size="sm"
        variant="green"
        className="gap-1"
        onClick={() => handleVerify(healthcareCenter.id)}
        disabled={isPending || healthcareCenter.accountVerified}
      >
        {isPending ? <Spinner /> : <CheckIcon className="h-4 w-4" />}
        <span>Verify</span>
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className="gap-1"
        onClick={() => handleDelete(healthcareCenter.id)}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : <TrashIcon className="h-4 w-4" />}
        <span>Delete</span>
      </Button>
    </div>
  );
}
