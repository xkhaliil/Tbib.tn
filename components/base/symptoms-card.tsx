import React from "react";

import { CheckIcon } from "@radix-ui/react-icons";

interface SymptomsCardProps {
  title: string;
  description: string;
  checked?: boolean;
}

export function SymptomsCard({
  title,
  description,
  checked,
}: SymptomsCardProps) {
  return (
    <div className="relative flex cursor-pointer rounded-lg border bg-white px-5 py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col space-y-0.5">
          <h1 className="font-medium">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {checked ? (
          <div className="absolute right-4 top-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="absolute right-4 top-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border" />
        )}
      </div>
    </div>
  );
}
