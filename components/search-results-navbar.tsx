"use client";

import React from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCurrentSession } from "@/actions/auth";
import { MapPinIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Container } from "@/components/container";
import { Logo } from "@/components/marketing/logo";

import HeroSearchInput from "./hero-search-input";

interface SearchResultsNavbarProps {
  currentUser: Awaited<ReturnType<typeof getCurrentSession>>;
}

export function SearchResultsNavbar({ currentUser }: SearchResultsNavbarProps) {
  const searchParams = useSearchParams();

  const speciality = searchParams?.get("speciality");
  const location = searchParams?.get("location");
  return (
    <div className="border-b bg-muted/40">
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center">
            <Logo className="h-8 w-8" />
            <span className="ml-3 text-xl font-bold tracking-tight text-blue-600">
              Oladoc
            </span>
          </div>
        </Link>
        {currentUser ? (
          <UserButton side="bottom" align="end" />
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="blue" className="rounded-full" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button variant="secondary" className="rounded-full" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
      <Container className="mb-5 max-w-[1600px]">
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
      </Container>
    </div>
  );
}
