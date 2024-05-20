"use client";

import React from "react";

import { getPatientById } from "@/actions/patient";
import {
  ManagePatientBackgroundSchema,
  ManagePatientBackgroundSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BackgroundInfoFormProps {
  patient: Awaited<ReturnType<typeof getPatientById>>;
}

export function BackgroundInfoForm({ patient }: BackgroundInfoFormProps) {
  const manageBackgroundInfoForm = useForm<ManagePatientBackgroundSchemaType>({
    resolver: zodResolver(ManagePatientBackgroundSchema),
    defaultValues: {
      allergies: patient?.allergies.length === 0 ? [" "] : patient?.allergies,
      chronicDiseases:
        patient?.chronicDiseases.length === 0
          ? [" "]
          : patient?.chronicDiseases,
      vaccinations:
        patient?.vaccinations.length === 0 ? [" "] : patient?.vaccinations,
      surgeries: patient?.surgeries.length === 0 ? [" "] : patient?.surgeries,
      familyHistory:
        patient?.familyHistory.length === 0 ? [" "] : patient?.familyHistory,
      bloodType: patient?.bloodType || "O_NEGATIVE",
      smoker: patient?.smoker || false,
      alcohol: patient?.alcohol || false,
      occupation: patient?.occupation || "",
    },
  });

  const { fields: allergies, append: appendAllergy } = useFieldArray({
    // @ts-ignore
    name: "allergies",
    control: manageBackgroundInfoForm.control,
  });

  const { fields: chronicDiseases, append: appendChronicDisease } =
    useFieldArray({
      // @ts-ignore
      name: "chronicDiseases",
      control: manageBackgroundInfoForm.control,
    });

  const { fields: vaccinations, append: appendVaccination } = useFieldArray({
    // @ts-ignore
    name: "vaccinations",
    control: manageBackgroundInfoForm.control,
  });

  const { fields: surgeries, append: appendSurgery } = useFieldArray({
    // @ts-ignore
    name: "surgeries",
    control: manageBackgroundInfoForm.control,
  });

  const { fields: familyHistory, append: appendFamilyHistory } = useFieldArray({
    // @ts-ignore
    name: "familyHistory",
    control: manageBackgroundInfoForm.control,
  });

  return (
    <Form {...manageBackgroundInfoForm}>
      <form
        className="grid grid-cols-1 gap-4 md:gap-8"
        onSubmit={manageBackgroundInfoForm.handleSubmit((data) =>
          console.log(data),
        )}
      >
        <Card className="flex flex-col gap-2 p-6 shadow-none">
          <div className="flex flex-col pb-3">
            <h1 className="font-semibold">Background History</h1>
            <p className="text-sm text-muted-foreground">
              List all the background information of the patient including
              chronic diseases, vaccinations, surgeries, and family history.
            </p>
          </div>
          {chronicDiseases.map((field, index) => (
            <FormField
              control={manageBackgroundInfoForm.control}
              key={field.id}
              name={`chronicDiseases.${index}`}
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Chronic Disease</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input type="text" {...field} />
                      {index === chronicDiseases.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => appendChronicDisease(" ")}
                          className="h-9 w-9"
                        >
                          <PlusCircledIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {vaccinations.map((field, index) => (
            <FormField
              control={manageBackgroundInfoForm.control}
              key={field.id}
              name={`vaccinations.${index}`}
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Vaccination</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input type="text" {...field} />
                      {index === vaccinations.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => appendVaccination(" ")}
                          className="h-9 w-9"
                        >
                          <PlusCircledIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {surgeries.map((field, index) => (
            <FormField
              control={manageBackgroundInfoForm.control}
              key={field.id}
              name={`surgeries.${index}`}
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Surgery</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input type="text" {...field} />
                      {index === surgeries.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => appendSurgery(" ")}
                          className="h-9 w-9"
                        >
                          <PlusCircledIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {familyHistory.map((field, index) => (
            <FormField
              control={manageBackgroundInfoForm.control}
              key={field.id}
              name={`familyHistory.${index}`}
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Family History</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input type="text" {...field} />
                      {index === familyHistory.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => appendFamilyHistory(" ")}
                          className="h-9 w-9"
                        >
                          <PlusCircledIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </Card>

        <Card className="flex flex-col gap-2 p-6 shadow-none">
          <div className="flex flex-col pb-3">
            <h1 className="font-semibold">Allegeries</h1>
            <p className="text-sm text-muted-foreground">
              List all the allergies the patient has.
            </p>
          </div>
          {allergies.map((field, index) => (
            <FormField
              control={manageBackgroundInfoForm.control}
              key={field.id}
              name={`allergies.${index}`}
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Allergy</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input type="text" {...field} />
                      {index === allergies.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => appendAllergy(" ")}
                          className="h-9 w-9"
                        >
                          <PlusCircledIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </Card>
      </form>
    </Form>
  );
}
