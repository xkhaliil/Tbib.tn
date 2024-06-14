import React from "react";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

export function GetStartedBanner() {
  return (
    <section
      id="get-started-today"
      className="bg-gradient-to-r from-[#919bff] to-[#133a94] py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-heading text-3xl tracking-tight text-white sm:text-4xl">
            Let&apos;s start your consultation today with Oladoc
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Create an account and book your first appointment today with our
            healthcare professionals.
          </p>
          <button
            className={cn(
              buttonVariants({ variant: "white", size: "lg" }),
              "group relative mt-10 rounded-full",
            )}
          >
            <span>
              <Link href="/auth/sign-up">Get Started</Link>
            </span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
