import React from "react";

import Image from "next/image";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

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
                <div className="flex h-[4.5rem] w-full flex-row items-center justify-center gap-x-4 rounded-full border bg-gray-50 px-6 py-3 placeholder-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                  <input
                    type="text"
                    placeholder="Speaciality, doctor, or center"
                    className="h-full w-full border-r bg-transparent placeholder-muted-foreground outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State or city"
                    className="relative h-full w-full bg-transparent placeholder-muted-foreground outline-none"
                  />
                  <Button variant="blue" size="lg" className="rounded-full">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
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
