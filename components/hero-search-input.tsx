"use client";

import React, { forwardRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { specialties, states } from "@/constants";
import { SearchIcon } from "lucide-react";
import qs from "query-string";

import { Button } from "@/components/ui/button";

interface HeroSearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (speciality: string, location: string) => void;
  onSpecialityChange?: (speciality: string) => void;
  onLocationChange?: (location: string) => void;
}

export default forwardRef<HTMLInputElement, HeroSearchInputProps>(
  function HeroSearchInput(
    { onSearch, onSpecialityChange, onLocationChange, ...props },
    ref,
  ) {
    const router = useRouter();
    const params = useSearchParams();

    const [specialitySearchInput, setSpecialitySearchInput] =
      React.useState("");
    const [locationSearchInput, setLocationSearchInput] = React.useState("");
    const [specialityInputFocused, setSpecialityInputFocused] =
      React.useState(false);
    const [locationInputFocused, setLocationInputFocused] =
      React.useState(false);

    const specialtiesList = React.useMemo(() => {
      if (!specialitySearchInput.trim()) return [];

      const searchWords = specialitySearchInput.split(" ");

      return specialties
        .filter((specialty) =>
          searchWords.every((word) =>
            specialty.specialties.some((s) =>
              s.toLowerCase().includes(word.toLowerCase()),
            ),
          ),
        )
        .slice(0, 5);
    }, [specialitySearchInput]);

    const statesList = React.useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return states
        .filter((state) =>
          searchWords.every((word) =>
            state.toLowerCase().includes(word.toLowerCase()),
          ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    const handleSpecialityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSpecialitySearchInput(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const formattedInput =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
      setLocationSearchInput(formattedInput);
    };

    const onApply = React.useCallback(() => {
      let query = {};

      if (params) {
        query = qs.parse(params.toString());
      }

      let updatedQuery: Record<string, string> = {
        ...query,
        speciality: specialitySearchInput,
        location: locationSearchInput,
      };

      if (specialitySearchInput === "" && locationSearchInput === "") {
        updatedQuery = {
          ...query,
          speciality: "General Practitioner",
          location: "Tunis",
        };
      }

      if (specialitySearchInput === "" || locationSearchInput === "") {
        updatedQuery = {
          ...query,
          speciality: "General Practitioner",
          location: locationSearchInput,
        };
      }
      if (specialitySearchInput && locationSearchInput === "") {
        updatedQuery = {
          ...query,
          speciality: specialitySearchInput,
          location: "Tunis",
        };
      }

      const url = qs.stringifyUrl(
        {
          url: "/search",
          query: updatedQuery,
        },
        { skipNull: true },
      );

      router.push(url);
    }, [params, specialitySearchInput, locationSearchInput, router]);
    return (
      <div className="flex h-[4.5rem] w-full flex-row items-center justify-center gap-x-4 rounded-full border bg-gray-50 px-6 py-3 placeholder-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Speciality"
            className="h-full w-full border-r bg-transparent placeholder-muted-foreground outline-none"
            value={specialitySearchInput}
            onChange={handleSpecialityChange}
            onFocus={() => setSpecialityInputFocused(true)}
            onBlur={() => setSpecialityInputFocused(false)}
            {...props}
            ref={ref}
          />
          {specialitySearchInput.trim() && specialityInputFocused && (
            <div className="absolute z-30 max-h-[20rem] w-full overflow-y-auto rounded-b-lg border bg-white shadow-lg">
              {specialtiesList.map((specialty) => (
                <div key={specialty.category}>
                  <p className="px-4 py-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {specialty.category}
                  </p>
                  <div className="flex flex-col px-2.5">
                    {specialty.specialties.map((s) => (
                      <button
                        key={s}
                        className="flex items-start justify-start rounded-lg p-3 text-sm font-normal text-muted-foreground hover:bg-muted"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          onSpecialityChange!(s);
                          setSpecialitySearchInput(s);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Location"
            className="h-full w-full bg-transparent placeholder-muted-foreground outline-none"
            value={locationSearchInput}
            onChange={handleLocationChange}
            onFocus={() => setLocationInputFocused(true)}
            onBlur={() => setLocationInputFocused(false)}
          />
          {locationSearchInput.trim() && locationInputFocused && (
            <div className="absolute z-30 max-h-[20rem] w-full overflow-y-auto rounded-b-lg border bg-white p-2.5 shadow-lg">
              {statesList.map((state) => (
                <button
                  key={state}
                  className="flex w-full items-start justify-start rounded-lg p-3 text-sm font-normal text-muted-foreground hover:bg-muted"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onLocationChange!(state);
                    setLocationSearchInput(state);
                  }}
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button
          variant="blue"
          size="lg"
          className="rounded-full"
          onClick={onApply}
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    );
  },
);
