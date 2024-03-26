"use client";

import React from "react";

import { symptomsTypes, SymptomType } from "@/constants";
import { BookAppointmentSchema, BookAppointmentSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { SymptomsCard } from "../symptoms-card";

export function BookAppointmentForm() {
  const bookAppointmentForm = useForm<BookAppointmentSchemaType>({
    resolver: zodResolver(BookAppointmentSchema),
    defaultValues: {
      symptomsType: SymptomType.MUSCLES_JOINTS,
      symptoms: "",
      symptomsDuration: 1,
      symptomsLength: "DAYS",
      symptomsSeverity: "LOW",
      additionalImages: [],
    },
  });

  const selectedLength = bookAppointmentForm.watch("symptomsLength");
  return (
    <Form {...bookAppointmentForm}>
      <form className="my-12 space-y-6">
        <div className="grid grid-cols-1 place-content-between gap-6 lg:grid-cols-2">
          <div className="flex flex-col space-y-1">
            <h3 className="font-semibold text-primary">Symptoms Information</h3>
            <p className="text-sm text-muted-foreground">
              Provide information about the symptoms you are experiencing.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <FormField
                control={bookAppointmentForm.control}
                name="symptomsType"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-4"
                    >
                      {symptomsTypes.map((type) => (
                        <FormItem key={type.title}>
                          <FormLabel className="ring-white/60 ring-offset-2 ring-offset-sky-600 [&:has([data-state=checked])>div]:ring-2">
                            <FormControl>
                              <RadioGroupItem
                                value={type.title}
                                className="sr-only"
                              />
                            </FormControl>
                            <SymptomsCard
                              title={type.title}
                              description={type.description}
                              checked={field.value === type.value}
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="grid grid-cols-1 place-content-between gap-6 lg:grid-cols-2">
          <div className="flex flex-col space-y-1">
            <h3 className="font-semibold text-primary">Symptoms Details</h3>
            <p className="text-sm text-muted-foreground">
              Provide additional details about the symptoms you are
              experiencing.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <FormField
                control={bookAppointmentForm.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter symptoms"
                        className="w-full"
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide additional details about the symptoms you are
                      experiencing.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={bookAppointmentForm.control}
                  name="symptomsDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Symptoms Duration
                        {selectedLength === "DAYS" && (
                          <span className="text-muted-foreground">
                            {" "}
                            (in days)
                          </span>
                        )}
                        {selectedLength === "WEEKS" && (
                          <span className="text-muted-foreground">
                            {" "}
                            (in weeks)
                          </span>
                        )}
                        {selectedLength === "MONTHS" && (
                          <span className="text-muted-foreground">
                            {" "}
                            (in months)
                          </span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Enter duration"
                        />
                      </FormControl>
                      <FormDescription>
                        How long have you been experiencing these symptoms?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookAppointmentForm.control}
                  name="symptomsLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms Length</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {["DAYS", "WEEKS", "MONTHS"].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value.charAt(0) + value.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormField
                  control={bookAppointmentForm.control}
                  name="symptomsSeverity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms Severity</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {["LOW", "MEDIUM", "HIGH"].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value.charAt(0) + value.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
