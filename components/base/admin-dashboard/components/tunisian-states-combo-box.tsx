"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TunisianStates = [
  {
    value: "tunis",
    label: "Tunis",
  },
  {
    value: "ariana",
    label: "Ariana",
  },
  {
    value: "benArous",
    label: "Ben Arous",
  },
  {
    value: "laManouba",
    label: "La Manouba",
  },
  {
    value: "nabeul",
    label: "Nabeul",
  },
  {
    value: "zaghouan",
    label: "Zaghouan",
  },
  {
    value: "bizerte",
    label: "Bizerte",
  },
  {
    value: "béja",
    label: "Béja",
  },
  {
    value: "jendouba",
    label: "Jendouba",
  },
  {
    value: "kef",
    label: "Kef",
  },
  {
    value: "siliana",
    label: "Siliana",
  },
  {
    value: "sousse",
    label: "Sousse",
  },
  {
    value: "monastir",
    label: "Monastir",
  },
  {
    value: "mahdia",
    label: "Mahdia",
  },
  {
    value: "sfax",
    label: "Sfax",
  },
  {
    value: "kairouan",
    label: "Kairouan",
  },
  {
    value: "kasserine",
    label: "Kasserine",
  },
  {
    value: "sidiBouzid",
    label: "Sidi Bouzid",
  },
  {
    value: "gabès",
    label: "Gabès",
  },
  {
    value: "medenine",
    label: "Medenine",
  },
  {
    value: "tataouine",
    label: "Tataouine",
  },
  {
    value: "gafsa",
    label: "Gafsa",
  },
  {
    value: "tozeur",
    label: "Tozeur",
  },
  {
    value: "kebili",
    label: "Kebili",
  },
];

export function TunisianStatesComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? TunisianStates.find((state) => state.value === value)?.label
            : "Select state..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="States" />
          <CommandEmpty>No state found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {TunisianStates.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === state.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {state.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
