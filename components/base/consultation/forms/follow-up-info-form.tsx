"use client";

import React from "react";

import {
  CreateFollowUpDataSchema,
  CreateFollowUpDataSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

export function FollowUpInfoForm() {
  const followUpInfoForm = useForm<CreateFollowUpDataSchemaType>({
    resolver: zodResolver(CreateFollowUpDataSchema),
    defaultValues: {
      weight: 60,
      height: 189,
    },
  });

  const calculateBMI = (weight: number, height: number) => {
    return (weight / (height / 100) ** 2).toFixed(2);
  };
  return (
    <Form {...followUpInfoForm}>
      <form
        className="space-y-2"
        onSubmit={followUpInfoForm.handleSubmit((data) => console.log(data))}
      >
        <FormField
          control={followUpInfoForm.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={followUpInfoForm.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={followUpInfoForm.control}
          name="bmi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BMI</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  defaultValue={calculateBMI(
                    followUpInfoForm.watch("weight"),
                    followUpInfoForm.watch("height"),
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
