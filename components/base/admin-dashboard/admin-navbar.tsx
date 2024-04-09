import React from "react";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AdminNavbar() {
  return (
    <header className="z-50 col-start-1 col-end-3 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:col-start-2 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col"></SheetContent>
      </Sheet>
    </header>
  );
}
