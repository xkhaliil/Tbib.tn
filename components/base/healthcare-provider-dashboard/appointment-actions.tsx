import React from "react";

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

interface AppointmentActionsProps {
  appointment: Appointment;
}

export function AppointmentActions({ appointment }: AppointmentActionsProps) {
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
          <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-xs">Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
