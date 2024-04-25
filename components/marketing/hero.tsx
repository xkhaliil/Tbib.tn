"use client";

import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

import HeroSearchInput from "../hero-search-input";

export function Hero() {
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-32">
      <div className="absolute inset-0 -bottom-14 -top-36 overflow-hidden bg-indigo-50">
        <Image
          alt=""
          width="918"
          height="1495"
          className="absolute left-0 top-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          style={{ color: "transparent" }}
          src="/images/hero-background.jpg"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white"></div>
      </div>
      <Container>
        <div className="mx-auto max-w-2xl lg:max-w-5xl lg:px-12">
          <h1 className="font-display text-center text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            Empowering your health journey with Oladoc
          </h1>

          <p className="mt-12 text-center text-xl text-muted-foreground">
            Your health, simplified. Effortless appointments, personal records,
            and a world of well-being in your hands. Elevate your healthcare
            journey with Oladoc.
          </p>
          <div className="mt-12">
            <div className="flex items-center justify-center">
              <div className="w-full">
                <HeroSearchInput
                  onSearch={(s, l) => {
                    alert(`Searching for ${s} in ${l}`);
                  }}
                  onSpecialityChange={(speciality) => {
                    console.log(speciality);
                  }}
                  onLocationChange={(location) => {
                    console.log(location);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:hidden">
            <div className="flex flex-col gap-y-4">
              <Button variant="blue" size="lg" className="rounded-2xl">
                Sign in
              </Button>
              <Button variant="secondary" size="lg" className="rounded-2xl">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
