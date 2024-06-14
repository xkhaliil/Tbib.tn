"use client";

import React from "react";

import { getPatientRecord } from "@/actions/patient";
import { manageBackgroundInfo } from "@/actions/record";
import {
  ManagePatientBackgroundSchema,
  ManagePatientBackgroundSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BloodType } from "@prisma/client";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

interface BackgroundInfoFormProps {
  appointmentId: string;
  record: Awaited<ReturnType<typeof getPatientRecord>>;
}

export function BackgroundInfoForm({
  record,
  appointmentId,
}: BackgroundInfoFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const manageBackgroundInfoForm = useForm<ManagePatientBackgroundSchemaType>({
    resolver: zodResolver(ManagePatientBackgroundSchema),
    defaultValues: {
      allergies: record?.allergies.length === 0 ? [" "] : record?.allergies,
      chronicDiseases:
        record?.chronicDiseases.length === 0 ? [" "] : record?.chronicDiseases,
      vaccinations:
        record?.vaccinations.length === 0 ? [" "] : record?.vaccinations,
      surgeries: record?.surgeries.length === 0 ? [" "] : record?.surgeries,
      familyHistory:
        record?.familyHistory.length === 0 ? [" "] : record?.familyHistory,
      bloodType: record?.bloodType || BloodType.A_POSITIVE,
      smoker: record?.smoker || false,
      alcohol: record?.alcohol || false,
      occupation: record?.occupation || "",
    },
  });

  const {
    fields: allergies,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    //@ts-ignore
    name: "allergies",
    control: manageBackgroundInfoForm.control,
  });

  const {
    fields: chronicDiseases,
    append: appendChronicDisease,
    remove: removeChronicDisease,
  } = useFieldArray({
    //@ts-ignore
    name: "chronicDiseases",
    control: manageBackgroundInfoForm.control,
  });

  const {
    fields: vaccinations,
    append: appendVaccination,
    remove: removeVaccination,
  } = useFieldArray({
    //@ts-ignore
    name: "vaccinations",
    control: manageBackgroundInfoForm.control,
  });

  const {
    fields: surgeries,
    append: appendSurgery,
    remove: removeSurgery,
  } = useFieldArray({
    //@ts-ignore
    name: "surgeries",
    control: manageBackgroundInfoForm.control,
  });

  const {
    fields: familyHistory,
    append: appendFamilyHistory,
    remove: removeFamilyHistory,
  } = useFieldArray({
    //@ts-ignore
    name: "familyHistory",
    control: manageBackgroundInfoForm.control,
  });

  const bloodTypes = Object.values(BloodType);

  const getBloodType = (bloodType: BloodType) => {
    switch (bloodType) {
      case BloodType.A_NEGATIVE:
        return "A-";
      case BloodType.A_POSITIVE:
        return "A+";
      case BloodType.AB_NEGATIVE:
        return "AB-";
      case BloodType.AB_POSITIVE:
        return "AB+";
      case BloodType.B_NEGATIVE:
        return "B-";
      case BloodType.B_POSITIVE:
        return "B+";
      case BloodType.O_NEGATIVE:
        return "O-";
      case BloodType.O_POSITIVE:
        return "O+";
    }
  };

  const onSubmit = async (data: ManagePatientBackgroundSchemaType) => {
    startTransition(() => {
      manageBackgroundInfo(record?.patientId, appointmentId, data)
        .then((data) => {
          if (data?.success) {
            setSuccess("Background information saved successfully!");
          } else {
            setError("An error occurred. Please try again.");
          }
        })
        .catch(() => {
          setError("An error occurred. Please try again.");
        });
    });
  };

  return (
    <Form {...manageBackgroundInfoForm}>
      <form
        className="grid grid-cols-1 gap-4 md:gap-8"
        onSubmit={manageBackgroundInfoForm.handleSubmit(onSubmit)}
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
                      <div className="flex items-center gap-2">
                        {index === chronicDiseases.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => appendChronicDisease(" ")}
                            className="h-9 w-9"
                          >
                            <PlusCircleIcon className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeChronicDisease(index)}
                          className="h-9 w-9"
                        >
                          <MinusCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
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
                      <div className="flex items-center gap-2">
                        {index === vaccinations.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => appendVaccination(" ")}
                            className="h-9 w-9"
                          >
                            <PlusCircleIcon className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeVaccination(index)}
                          className="h-9 w-9"
                        >
                          <MinusCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
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
                      <div className="flex items-center gap-2">
                        {index === surgeries.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => appendSurgery(" ")}
                            className="h-9 w-9"
                          >
                            <PlusCircleIcon className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSurgery(index)}
                          className="h-9 w-9"
                        >
                          <MinusCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
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
                      <div className="flex items-center gap-2">
                        {index === familyHistory.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => appendFamilyHistory(" ")}
                            className="h-9 w-9"
                          >
                            <PlusCircleIcon className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeFamilyHistory(index)}
                          className="h-9 w-9"
                        >
                          <MinusCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={manageBackgroundInfoForm.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem className="col-span-1 flex flex-col">
                <FormLabel>Blood Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bloodTypes.map((bloodType) => (
                      <SelectItem key={bloodType} value={bloodType}>
                        {getBloodType(bloodType)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="flex flex-col gap-2 p-6 shadow-none">
          <div className="flex flex-col pb-3">
            <h1 className="font-semibold">Allergies</h1>
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
                      <div className="flex items-center gap-2">
                        {index === allergies.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => appendAllergy(" ")}
                            className="h-9 w-9"
                          >
                            <PlusCircleIcon className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeAllergy(index)}
                          className="h-9 w-9"
                        >
                          <MinusCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
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
            <h1 className="font-semibold">Lifestyle</h1>
            <p className="text-sm text-muted-foreground">
              List all the lifestyle habits of the patient.
            </p>
          </div>
          <FormField
            control={manageBackgroundInfoForm.control}
            name="smoker"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div>
                  <FormLabel>Smoker</FormLabel>
                  <FormDescription>
                    Does the patient smoke cigarettes?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={manageBackgroundInfoForm.control}
            name="alcohol"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div>
                  <FormLabel>Alcohol</FormLabel>
                  <FormDescription>
                    Does the patient consume alcohol?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          <FormField
            control={manageBackgroundInfoForm.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="col-span-1 flex flex-col">
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <div className="flex flex-row items-center justify-end gap-4">
          <Button
            type="submit"
            variant="blue"
            disabled={isPending || !manageBackgroundInfoForm.formState.isDirty}
          >
            {isPending ? <Spinner className="mr-2" /> : null}
            Save
          </Button>
        </div>

        <FormSuccess message={success || ""} />
        <FormError message={error || ""} />
      </form>
    </Form>
  );
}
