import React from "react";

import Image from "next/image";
import { getTop5RateScoreDoctor } from "@/actions/doctors";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Top5DoctorsCarouselType = Awaited<
  ReturnType<typeof getTop5RateScoreDoctor>
>;
interface Top5DoctorsCarouselProps {
  doctors: Top5DoctorsCarouselType;
}
export function Top5DoctorsCarousel({
  doctors = [],
}: Top5DoctorsCarouselProps) {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {doctors.map((doctor, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div>
                <Card className="border-none shadow-none ">
                  <CardContent className="flex aspect-square flex-col items-center justify-center">
                    <img
                      src={doctor.doctor.user.image || ""}
                      alt={doctor.doctor.user.name}
                      className="h-full w-full rounded-md object-cover  "
                    />
                    <h1 className="text-xs font-normal shadow-sm ">
                      Dr. {doctor.doctor.user.name}
                    </h1>
                  </CardContent>
                  <CardContent className="flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <p className="text-sm font-semibold text-blue-600 dark:text-white">
                        Rank : {index + 1}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
