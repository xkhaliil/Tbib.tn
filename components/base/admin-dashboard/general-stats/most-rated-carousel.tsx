"use client";

import React from "react";

import { getbestRatedDoctorThisYear } from "@/actions/doctors";
import Autoplay from "embla-carousel-autoplay";
import { Rating } from "flowbite-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type MostRatedCarouselType = Awaited<
  ReturnType<typeof getbestRatedDoctorThisYear>
>;
interface MostRatedCarouselProps {
  week: MostRatedCarouselType;
  month: MostRatedCarouselType;
  year: MostRatedCarouselType;
}
export function MostRatedCarousel({
  week = [],
  month = [],
  year = [],
}: MostRatedCarouselProps) {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem
            className="flex flex-col items-center justify-center "
            key={1}
          >
            <h2 className="font-normal">Week</h2>
            <div className="p-1">
              <div>
                <div className="grid grid-cols-4">
                  <div className="col-span-1 h-16 w-full rounded-md shadow-sm">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={week[0].doctor.user.image || ""}
                      alt={week[0].doctor.user.name}
                    />
                  </div>
                  <div className="col-span-3 ml-3 flex h-16 w-full items-center justify-start space-x-3 rounded-sm  shadow-sm">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Dr. {week[0].doctor.user.name}
                      </h1>
                      <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                          {week[0].rating.toFixed(2)}
                        </p>
                      </Rating>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem
            className="flex flex-col items-center justify-center "
            key={2}
          >
            <h2 className="font-normal">Month</h2>
            <div className="p-1">
              <div>
                <div className="grid grid-cols-4">
                  <div className="col-span-1 h-16 w-full rounded-md  shadow-sm">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={month[0].doctor.user.image || ""}
                      alt={month[0].doctor.user.name}
                    />
                  </div>
                  <div className="col-span-3 ml-3 flex h-16 w-full items-center justify-start space-x-3 rounded-sm  shadow-sm">
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Dr. {month[0].doctor.user.name}
                      </h1>
                      <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                          {month[0].rating.toFixed(2)}
                        </p>
                      </Rating>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem
            className="flex flex-col items-center justify-center "
            key={3}
          >
            <h2 className="font-normal">Year</h2>
            <div className="p-1">
              {" "}
              <div className="grid grid-cols-4">
                <div className="col-span-1 h-16 w-full rounded-md border shadow-sm">
                  <img
                    className="h-full w-full rounded-md object-cover"
                    src={year[0].doctor.user.image || ""}
                    alt={year[0].doctor.user.name}
                  />
                </div>
                <div className="col-span-3 ml-3 flex h-16 w-full items-center justify-start space-x-3 rounded-sm  shadow-sm">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Dr. {year[0].doctor.user.name}
                    </h1>
                    <Rating>
                      <Rating.Star />
                      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                        {year[0].rating.toFixed(2)}
                      </p>
                    </Rating>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
