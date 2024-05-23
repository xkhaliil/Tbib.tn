"use client";

import React from "react";

import { getPatientRecord } from "@/actions/patient";
import { manageFollowUpInfo } from "@/actions/record";
import {
  ManageFollowUpDataSchema,
  ManageFollowUpDataSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

interface BackgroundInfoFormProps {
  appointmentId: string;
  record: Awaited<ReturnType<typeof getPatientRecord>>;
}

export function FollowUpInfoForm({
  appointmentId,
  record,
}: BackgroundInfoFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const followUpInfoForm = useForm<ManageFollowUpDataSchemaType>({
    resolver: zodResolver(ManageFollowUpDataSchema),
    defaultValues: {
      weight: record?.weight || 0,
      height: record?.height || 0,
      bloodPressure: record?.bloodPressure || 0,
      bmi: record?.bmi || 0,
    },
  });

  const calculateBMI = (weight: number, height: number) => {
    const bmi = (Number(weight) / (Number(height) * Number(height))) * 10000;
    if (isNaN(bmi)) return "";
    return followUpInfoForm.setValue("bmi", Number(bmi.toFixed(2)));
  };

  React.useEffect(() => {
    followUpInfoForm.watch(["weight", "height"]);
    calculateBMI(
      followUpInfoForm.watch("weight"),
      followUpInfoForm.watch("height"),
    );
  }, [followUpInfoForm.watch("weight"), followUpInfoForm.watch("height")]);

  const onSubmit = async (data: ManageFollowUpDataSchemaType) => {
    startTransition(() => {
      manageFollowUpInfo(record?.patientId, appointmentId, data)
        .then((data) => {
          if (data?.success) {
            setSuccess("Follow-up info updated!");
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
    <Form {...followUpInfoForm}>
      <form
        className="space-y-2"
        onSubmit={followUpInfoForm.handleSubmit(onSubmit)}
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
          name="bloodPressure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Pressure</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center justify-end gap-4 pt-2">
          <Button
            type="submit"
            variant="blue"
            disabled={isPending || !followUpInfoForm.formState.isDirty}
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
