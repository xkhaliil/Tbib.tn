import React from "react";

import { CheckIcon } from "@radix-ui/react-icons";

interface GenderCardProps {
  title: string;
  checked?: boolean;
}

export function GenderCard({ title, checked }: GenderCardProps) {
  return (
    <div className="relative flex h-9 cursor-pointer rounded-lg border bg-white px-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-medium">{title}</h1>

        {checked && (
          <div className="absolute right-2 top-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
