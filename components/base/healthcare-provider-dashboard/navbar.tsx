import React from "react";

import { BellIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchButton } from "@/components/search-button";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "z-10 col-start-3 col-end-4 flex h-16 w-full items-center justify-between border-b bg-white px-8",
        className,
      )}
    >
      <SearchButton />

      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                buttonVariants({ variant: "outline" }),
                "relative h-10 w-10 rounded-full p-0",
              )}
            >
              <span className="absolute right-0 top-0 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-destructive"></span>
              <BellIcon className="h-5 w-5 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[400px] rounded-xl p-0">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-semibold text-foreground">
                  Notifications
                </h3>
                <div className="flex h-5 w-5 items-center justify-center rounded border bg-muted text-xs font-medium">
                  3
                </div>
              </div>
              <Button variant="link" size="sm" className="p-0">
                Mark all as read
              </Button>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    New Patient
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You have a new patient waiting for you
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    New Patient
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You have a new patient waiting for you
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    New Patient
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You have a new patient waiting for you
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center border-t py-2.5">
              <Button variant="link" size="sm" className="p-0">
                View all
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
