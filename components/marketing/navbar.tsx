import React from "react";

import Link from "next/link";

import { Container } from "@/components/container";

import { Button } from "../ui/button";
import { Logo } from "./logo";

export function Navbar() {
  return (
    <header className="relative z-50 flex-none pt-12">
      <Container className="max-w-[1200px]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <div className="flex items-center">
              <Logo className="h-8 w-8" />
              <span className="ml-3 text-2xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </span>
            </div>
          </Link>

          <div className="hidden items-center space-x-4 md:flex">
            <Button variant="blue" size="lg" className="rounded-2xl" asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button variant="white" size="lg" className="rounded-2xl" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
