import React from "react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { SignInForm } from "@/components/forms/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-[800px_1fr]">
      <div className="flex flex-col items-center justify-center">
        <SignInForm />
        <div className="absolute left-4 top-4">
          <Button variant="link" asChild>
            <Link href="/" className="flex items-center gap-1.5">
              <ChevronLeftIcon className="h-4 w-4" />
              <h1>Back</h1>
            </Link>
          </Button>
        </div>
      </div>
      <div className="hidden border-l bg-muted lg:flex">
        <Image
          src="/images/sign-in-cover.jpg"
          alt="Sign in"
          className="h-full w-full object-cover"
          width={2000}
          height={2000}
        />
      </div>
    </div>
  );
}
