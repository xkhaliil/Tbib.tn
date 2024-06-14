"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { CalendarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { MessagesSquareIcon, SearchIcon, Users2Icon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchButton() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden w-full items-center gap-x-2.5 rounded-full border bg-secondary px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-secondary/80 md:max-w-lg lg:flex"
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Insert a command or search for something...
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
          <span>CTRL</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem
              className="flex items-center gap-2.5"
              onSelect={() => router.push("/hp/dashboard")}
            >
              <DashboardIcon className="h-5 w-5 text-muted-foreground" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              className="flex items-center gap-2.5"
              onSelect={() => router.push("/hp/dashboard/calendar")}
            >
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem
              className="flex items-center gap-2.5"
              onSelect={() => router.push("/hp/dashboard/messages")}
            >
              <MessagesSquareIcon className="h-5 w-5 text-muted-foreground" />
              <span>Messages</span>
            </CommandItem>
            <CommandItem
              className="flex items-center gap-2.5"
              onSelect={() => {
                router.push("/hp/dashboard/patients");
              }}
            >
              <Users2Icon className="h-5 w-5 text-muted-foreground" />
              <span>Patients</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
