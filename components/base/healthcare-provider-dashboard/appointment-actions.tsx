"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { startConsultation } from "@/actions/consultation";
import { Appointment } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";

interface AppointmentActionsProps {
  appointment: Appointment;
}

export function AppointmentActions({ appointment }: AppointmentActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const handleStartConsultation = () => {
    startTransition(() => {
      startConsultation(appointment.patientId).then(() => {
        router.push(
          `/hp/dashboard/consultations/${appointment.id}/${appointment.patientId}`,
        );
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="group ml-auto rounded-full"
        >
          <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-xs">View details</DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onClick={handleStartConsultation}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-2 text-muted-foreground" />}
            Start consultation
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
