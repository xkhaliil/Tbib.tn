import React from "react";

import { CheckIcon } from "@radix-ui/react-icons";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  checked?: boolean;
}

export function RoleCard({
  title,
  description,
  icon: Icon,
  checked,
}: RoleCardProps) {
  return (
    <div className="relative flex cursor-pointer rounded-lg border bg-white px-5 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
            <Icon className="h-5 w-5 stroke-sky-600 text-sky-600" />
          </div>

          <div className="flex flex-col space-y-0.5">
            <h1 className="font-medium">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {checked && (
          <div className="absolute right-4 top-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-600">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
