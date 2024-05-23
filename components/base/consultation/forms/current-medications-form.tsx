"use client";

import React from "react";

import {
  ManageCurrentMedicationsSchema,
  ManageCurrentMedicationsSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CurrentMedicationsForm() {
  const manageMedicationsForm = useForm<ManageCurrentMedicationsSchemaType>({
    resolver: zodResolver(ManageCurrentMedicationsSchema),
    defaultValues: {
      currentMedications: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: "currentMedications",
    control: manageMedicationsForm.control,
  });

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
          <CardDescription>
            Please enter the medications the patient is currently taking.
          </CardDescription>
        </CardHeader>
        <Button
          type="button"
          variant="outline"
          className="mr-6"
          size="sm"
          onClick={() =>
            append({
              name: "",
              dosage: "",
              duration: "",
            })
          }
        >
          Add Medication
        </Button>
      </div>
      <CardContent>
        <Form {...manageMedicationsForm}>
          <form
            className="space-y-4"
            onSubmit={manageMedicationsForm.handleSubmit((data) =>
              console.log(data),
            )}
          >
            {fields.map((field, index) => (
              <FormField
                control={manageMedicationsForm.control}
                key={field.id}
                name={`currentMedications.${index}.name`}
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Medication {index + 1}</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between gap-2">
                        <div className="grid grid-cols-6 gap-2">
                          <Input
                            type="text"
                            placeholder="Name"
                            {...manageMedicationsForm.register(
                              `currentMedications.${index}.name`,
                            )}
                            className="col-span-2 w-full"
                          />
                          <Input
                            type="text"
                            placeholder="Dosage"
                            {...manageMedicationsForm.register(
                              `currentMedications.${index}.dosage`,
                            )}
                            className="w-full"
                          />
                          <Input
                            type="text"
                            placeholder="Duration"
                            {...manageMedicationsForm.register(
                              `currentMedications.${index}.duration`,
                            )}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {fields.length === 0 && (
              <Card className="flex items-center justify-center p-6 shadow-none">
                <p className="text-sm text-muted-foreground">
                  No current medications added.
                </p>
              </Card>
            )}

            {fields.length > 0 && (
              <div className="flex flex-row items-center justify-end gap-4">
                <Button type="submit" variant="blue">
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
