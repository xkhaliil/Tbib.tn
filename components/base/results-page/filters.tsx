"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { insuranceCompanies, languages, paymentMethods } from "@/constants";
import { CheckIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Building2Icon, DollarSignIcon } from "lucide-react";
import qs from "query-string";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const [paymentsPopoverOpen, setPaymentsPopoverOpen] = React.useState(false);
  const [insurancesPopoverOpen, setInsurancesPopoverOpen] =
    React.useState(false);
  const [languagesDialogOpen, setLanguagesDialogOpen] = React.useState(false);
  const [selectedPaymentsMethods, setSelectedPaymentsMethods] = React.useState<
    string[]
  >([]);
  const [selectedInsurances, setSelectedInsurances] = React.useState<string[]>(
    [],
  );
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    [],
  );

  const onApply = React.useCallback(async () => {
    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    let updatedQuery: Record<string, string | string[]> = {
      ...query,
      paymentsMethods: selectedPaymentsMethods,
      insurances: selectedInsurances,
      languages: selectedLanguages,
    };

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  }, [
    params,
    selectedPaymentsMethods,
    selectedInsurances,
    selectedLanguages,
    router,
  ]);

  const clearFilters = React.useCallback(async () => {
    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }
    //@ts-ignore
    delete query.paymentsMethods;
    //@ts-ignore
    delete query.insurances;
    //@ts-ignore
    delete query.languages;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query,
      },
      { skipNull: true },
    );

    router.push(url);

    setSelectedPaymentsMethods([]);
    setSelectedInsurances([]);
    setSelectedLanguages([]);
  }, [params, router]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={paymentsPopoverOpen} onOpenChange={setPaymentsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="white" size="sm">
            <DollarSignIcon className="mr-1.5 h-3.5 w-3.5" />
            Payment Options
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex flex-col space-y-2">
            <h3 className="text-xs font-semibold">Payment Options</h3>
            {paymentMethods.map((method) => (
              <Button
                key={method.label}
                variant={
                  selectedPaymentsMethods.includes(method.value)
                    ? "green"
                    : "outline"
                }
                size="sm"
                className="justify-start"
                onClick={() => {
                  setSelectedPaymentsMethods((prev) =>
                    prev.includes(method.value)
                      ? prev.filter((m) => m !== method.value)
                      : [...prev, method.value],
                  );
                }}
              >
                {method.label}
                <span className="ml-auto">
                  {selectedPaymentsMethods.includes(method.value) && (
                    <CheckIcon className="h-4 w-4" />
                  )}
                </span>
              </Button>
            ))}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                clearFilters().then(() => setPaymentsPopoverOpen(false))
              }
            >
              Clear
            </Button>
            <Button
              variant="blue"
              size="sm"
              onClick={() => {
                onApply().then(() => setPaymentsPopoverOpen(false));
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover
        open={insurancesPopoverOpen}
        onOpenChange={setInsurancesPopoverOpen}
      >
        <PopoverTrigger asChild>
          <Button variant="white" size="sm">
            <Building2Icon className="mr-1.5 h-3.5 w-3.5" />
            Insurance
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <h3 className="mb-2 text-xs font-semibold">Insurance</h3>
          <div className="max-h-60 overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {insuranceCompanies.map((company) => (
                <Button
                  key={company.label}
                  variant={
                    selectedInsurances.includes(company.value)
                      ? "green"
                      : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setSelectedInsurances((prev) =>
                      prev.includes(company.value)
                        ? prev.filter((m) => m !== company.value)
                        : [...prev, company.value],
                    );
                  }}
                >
                  {company.label}
                  <span className="ml-auto">
                    {selectedInsurances.includes(company.value) && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                clearFilters().then(() => setInsurancesPopoverOpen(false))
              }
            >
              Clear
            </Button>
            <Button
              variant="blue"
              size="sm"
              onClick={() => {
                onApply().then(() => setInsurancesPopoverOpen(false));
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Dialog open={languagesDialogOpen} onOpenChange={setLanguagesDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="white" size="sm">
            <MixerHorizontalIcon className="mr-1.5 h-3.5 w-3.5" />
            More Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>More Filters</DialogTitle>
            <DialogDescription>
              Apply more filters to narrow down your search results.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm font-semibold">Preferred Languages</h3>
              <div className="flex flex-col space-y-2">
                {languages.map((language) => (
                  <Button
                    key={language.label}
                    variant={
                      selectedLanguages.includes(language.value)
                        ? "green"
                        : "outline"
                    }
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      setSelectedLanguages((prev) =>
                        prev.includes(language.value)
                          ? prev.filter((m) => m !== language.value)
                          : [...prev, language.value],
                      );
                    }}
                  >
                    {language.label}
                    <span className="ml-auto">
                      {selectedLanguages.includes(language.value) && (
                        <CheckIcon className="h-4 w-4" />
                      )}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                clearFilters().then(() => setLanguagesDialogOpen(false))
              }
            >
              Clear
            </Button>
            <Button
              variant="blue"
              onClick={() => {
                onApply().then(() => setLanguagesDialogOpen(false));
              }}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
