import React from "react";

import Image from "next/image";
import { getTop5RateScoreDoctor } from "@/actions/doctors";

import { Separator } from "@/components/ui/separator";

type Top5DoctorsType = Awaited<ReturnType<typeof getTop5RateScoreDoctor>>;
interface Top5DoctorsProps {
  doctors: Top5DoctorsType;
}
export function Top5Doctors({ doctors }: Top5DoctorsProps) {
  return (
    <div className="flex flex-col divide-y divide-border">
      {doctors?.map((doctor) => (
        <>
          <div
            key={doctor.doctor.id}
            className="flex items-center justify-between py-4"
          >
            <Image
              src={doctor.doctor.user.image || "/placeholder.svg"}
              alt={doctor.doctor.user.name}
              width={500}
              height={500}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex flex-col text-right">
              <h3 className="text-sm font-medium">{doctor.doctor.user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {doctor.doctor.speciality}
              </p>
              <h1 className="text-sm text-yellow-500">{doctor.rating}</h1>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
