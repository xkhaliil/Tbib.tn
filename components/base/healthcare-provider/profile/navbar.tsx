"use client";

import React from "react";

import Link from "next/link";
import { User } from "next-auth";

import { useSignInDialog } from "@/hooks/use-sign-in-dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/components/auth/user-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/marketing/logo";

interface NavbarProps {
  authenticatedUser: User | undefined;
}

export function Navbar({ authenticatedUser }: NavbarProps) {
  const signInDialog = useSignInDialog();
  return (
    <header className="z-10 w-full bg-background">
      <div className="border-b py-5">
        <Container className="max-w-[1600px]">
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            <Link className="flex items-center" href="/">
              <Logo className="h-7 w-7" />
              <span className="ml-2 text-2xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </span>
            </Link>

            {authenticatedUser ? (
              <UserButton />
            ) : (
              <div className="flex items-center gap-4">
                <Button variant="link" asChild className="px-0">
                  <Link href="/help">Help</Link>
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="blue"
                  onClick={() => {
                    signInDialog.setOpen(true);
                  }}
                >
                  Sign In
                </Button>
                <Button variant="white" asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}
