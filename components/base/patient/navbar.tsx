"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@/components/auth/user-button";
import { Logo } from "@/components/marketing/logo";

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background">
      <div className="mx-auto flex w-full max-w-[1800px] items-center px-4 md:px-6">
        <nav className="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavbarLink
            href="/patient/dashboard"
            isActive={pathname === "/patient/dashboard"}
          >
            <Logo className="h-6 w-6" />
            <span className="sr-only">Oladoc</span>
          </NavbarLink>
          <NavbarLink
            href="/patient/dashboard"
            isActive={pathname === "/patient/dashboard"}
          >
            Dashboard
          </NavbarLink>
          <NavbarLink
            href="/patient/dashboard/appointments"
            isActive={pathname === "/patient/dashboard/appointments"}
          >
            My Appointments
          </NavbarLink>
          <NavbarLink
            href="/patient/dashboard/consultations"
            isActive={pathname === "/patient/dashboard/consultations"}
          >
            My Consultations
          </NavbarLink>
          <NavbarLink
            href="/patient/dashboard/medical-documents"
            isActive={pathname === "/patient/dashboard/medical-documents"}
          >
            Medical Documents
          </NavbarLink>
          <NavbarLink
            href="/patient/dashboard/settings"
            isActive={pathname.startsWith("/patient/dashboard/settings")}
          >
            Settings
          </NavbarLink>
        </nav>
        <MobileMenu />
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <SearchButton />
          <UserButton side="bottom" align="end" />
        </div>
      </div>
    </header>
  );
}

interface NavbarLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function NavbarLink({ href, isActive, children }: NavbarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-lg text-muted-foreground md:text-sm",
        isActive && "font-semibold text-blue-600",
      )}
    >
      {children}
    </Link>
  );
}

export function MobileMenu() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Logo className="h-6 w-6" />
            <span className="sr-only">Oladoc</span>
          </Link>
          <NavbarLink
            href="/patient/dashboard"
            isActive={pathname === "/patient/dashboard"}
          >
            Dashboard
          </NavbarLink>
          <NavbarLink
            href="/patient/appointments"
            isActive={pathname === "/patient/appointments"}
          >
            My Appointments
          </NavbarLink>
          <NavbarLink
            href="/patient/consultations"
            isActive={pathname === "/patient/consultations"}
          >
            My Consultations
          </NavbarLink>
          <NavbarLink
            href="/patient/medical-records"
            isActive={pathname === "/patient/medical-records"}
          >
            Medical Records
          </NavbarLink>
          <NavbarLink
            href="/patient/settings"
            isActive={pathname === "/patient/settings"}
          >
            Settings
          </NavbarLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SearchButton() {
  return (
    <div className="w-full flex-1 px-4 md:w-auto md:flex-none">
      <button className="relative inline-flex h-9 w-full items-center justify-start whitespace-nowrap rounded-[0.5rem] border border-input bg-background px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64">
        <span className="hidden lg:inline-flex">Type to search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="font-mono pointer-events-none absolute right-[0.4rem] top-[0.4rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    </div>
  );
}
