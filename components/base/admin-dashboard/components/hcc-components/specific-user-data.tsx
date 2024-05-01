import React from "react";

import { getSelectedHealthcareCenter } from "@/actions/admin";

import { Label } from "@/components/ui/label";

type hcc = Awaited<ReturnType<typeof getSelectedHealthcareCenter>>;
interface HealthcareCenterDetailsPageParams {
  hcc: hcc;
}
export function SpecificUserData({ hcc }: HealthcareCenterDetailsPageParams) {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Healthcare-center's data
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="speciality">Website</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.website}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="speciality">Description</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.description}
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
