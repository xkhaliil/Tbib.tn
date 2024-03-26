import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/marketing/logo";

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="flex items-center justify-center">
            <Logo className="h-8 w-8" />
            <span className="ml-3 text-2xl font-bold tracking-tighter text-blue-600">
              Oladoc
            </span>
          </div>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <Badge variant="white">
                <Link href="/auth/sign-in">Sign in</Link>
              </Badge>
              <Badge variant="white">
                <Link href="/auth/sign-up">Get Started</Link>
              </Badge>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6"></div>
          <p className="mt-6 text-sm text-muted-foreground sm:mt-0">
            Copyright © {new Date().getFullYear()} Oladoc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
