import React from "react";

import { getDoctorById } from "@/actions/doctors";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { VerifiedAccountBadge } from "@/components/base/healthcare-provider/verified-account-badge";

type Doctor = Awaited<ReturnType<typeof getDoctorById>>;

interface HealthcareProviderDetailsPageParams {
  doctor: Doctor;
}

export function UserData({ doctor }: HealthcareProviderDetailsPageParams) {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Account data</legend>
        <div className="relative h-20 w-20">
          <div className="flex items-center space-x-4">
            <div>
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={doctor?.user.image ?? "/placeholder.svg"}
                  alt={doctor?.user.name}
                  className="h-20 w-20"
                />
                <AvatarFallback>
                  <span className="text-3xl">
                    {doctor?.user.name.charAt(0).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>

              {doctor?.accountVerified && <VerifiedAccountBadge />}
            </div>

            <div className="flex flex-col">
              <h1 className="font-medium">{doctor?.user.name}</h1>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {doctor?.user.email}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
              {doctor?.user.name}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
              {doctor?.user.email}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {doctor?.user.gender}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">Date of birth</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {String(doctor?.user.dateOfBirth?.getDay())}-
                {String(doctor?.user.dateOfBirth?.getMonth())}-
                {String(doctor?.user.dateOfBirth?.getFullYear())}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {doctor?.user.phone}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {doctor?.user.state}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {doctor?.user.city}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pc">Postal code</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {doctor?.user.postalCode}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Bio</Label>
              <div className="font-mono flex items-center rounded-md border px-4 py-2 text-sm">
                {doctor?.user.bio}
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
