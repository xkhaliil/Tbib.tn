"use client";

import React from "react";

import { getBestRatedDoctor } from "@/actions/doctors";
import { Rating } from "flowbite-react";

type BestRatedDoctorType = Awaited<ReturnType<typeof getBestRatedDoctor>>;
interface MostRatedDoctorProps {
  doctor: BestRatedDoctorType;
}
export function MostRatedDoctor({ doctor = [] }: MostRatedDoctorProps) {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 h-36 w-full rounded-md  shadow-sm ">
        <img
          className="h-full w-full rounded-md object-cover"
          src={doctor[0].doctor.user.image || ""}
          alt={doctor[0].doctor.user.name}
        />
      </div>
      <div className="col-span-1 ml-3 mt-9 flex h-16  flex-col items-center justify-center space-x-3 rounded-sm">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dr. {doctor[0].doctor.user.name}
          </h1>
          <Rating>
            <Rating.Star />
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {doctor[0].rating}
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {doctor[0].totalRating}{" "}
              {doctor[0].totalRating > 1 ? "reviews" : "review"}
            </a>
          </Rating>
        </div>
      </div>
    </div>
  );
}
