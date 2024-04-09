import React from "react";

import { HealthCareProvider, User } from "@prisma/client";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface UserDataProps {
  healthcareProvider:
    | (HealthCareProvider & {
        user: User;
      })
    | null;
}

export function UserData({ healthcareProvider }: UserDataProps) {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Account data</legend>

        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={healthcareProvider?.user.image || ""}
              alt={healthcareProvider?.user.name || ""}
            />
            <AvatarFallback>
              {healthcareProvider?.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {healthcareProvider?.user.name || "N/A"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {healthcareProvider?.user.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="gender">Gender</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.gender}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="dob">Date of birth</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.dateOfBirth
                ? format(
                    new Date(healthcareProvider?.user.dateOfBirth),
                    "MM/dd/yyyy",
                  )
                : "N/A"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.phone}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="state">State</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.state}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="city">City</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.city}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pc">Postal code</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.postalCode}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Bio</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {healthcareProvider?.user.bio}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="name">Email verification</Label>
          <Badge variant="success">
            {healthcareProvider?.accountVerified ? "Verified" : "Not Verified"}
          </Badge>
        </div>
      </fieldset>
    </form>
  );
}