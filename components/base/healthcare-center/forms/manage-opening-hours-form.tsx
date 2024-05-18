"use client";

import React from "react";

import dynamic from "next/dynamic";
import {
  createOpeningHoursForHealthcareCenter,
  getOpeningHoursByHealthcareCenterId,
  updateOpeningHoursForHealthcareCenter,
} from "@/actions/opening-hours";
import {
  ManageOpeningHoursSchema,
  ManageOpeningHoursSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const TimePicker = dynamic(
  () => import("@/components/ui/time-picker").then((mod) => mod.TimePicker),
  {
    ssr: false,
    loading: () => (
      <div className="h-[40px] w-[100px] rounded-lg bg-gray-200"></div>
    ),
  },
);

const TimePickerSegment = dynamic(
  () =>
    import("@/components/ui/time-picker").then((mod) => mod.TimePickerSegment),
  {
    ssr: false,
  },
);

const TimePickerSeparator = dynamic(
  () =>
    import("@/components/ui/time-picker").then(
      (mod) => mod.TimePickerSeparator,
    ),
  {
    ssr: false,
  },
);

interface ManageOpeningHoursFormProps {
  openingHours: Awaited<ReturnType<typeof getOpeningHoursByHealthcareCenterId>>;
}

export function ManageOpeningHoursForm({
  openingHours,
}: ManageOpeningHoursFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");

  if (!openingHours) {
    return <Spinner />;
  }

  const manageOpeningHoursForm = useForm<ManageOpeningHoursSchemaType>({
    resolver: zodResolver(ManageOpeningHoursSchema),
    defaultValues: {
      openingHours: [
        {
          dayOfWeek: 0,
          startTime:
            openingHours[0]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[0]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[0]?.isClosed || false,
        },
        {
          dayOfWeek: 1,
          startTime:
            openingHours[1]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[1]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[1]?.isClosed || false,
        },
        {
          dayOfWeek: 2,
          startTime:
            openingHours[2]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[2]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[2]?.isClosed || false,
        },
        {
          dayOfWeek: 3,
          startTime:
            openingHours[3]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[3]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[3]?.isClosed || false,
        },
        {
          dayOfWeek: 4,
          startTime:
            openingHours[4]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[4]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[4]?.isClosed || false,
        },
        {
          dayOfWeek: 5,
          startTime:
            openingHours[5]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[5]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[5]?.isClosed || false,
        },
        {
          dayOfWeek: 6,
          startTime:
            openingHours[6]?.startTime || new Date("2024-03-18T08:00:00"),
          endTime: openingHours[6]?.endTime || new Date("2024-03-18T17:00:00"),
          isClosed: openingHours[6]?.isClosed || false,
        },
      ],
    },
  });

  const getDayStringByIndex = (index: number) => {
    switch (index) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  const onSubmit = async (data: ManageOpeningHoursSchemaType) => {
    setError("");
    setSuccess("");

    if (openingHours?.length === 0) {
      startTransition(() => {
        createOpeningHoursForHealthcareCenter(data)
          .then((data) => {
            if (data?.error) {
              setError(data.error);
            }
            if (data?.success) {
              setSuccess(data.success);
            }
          })
          .catch(() => {
            setError("Something went wrong");
          });
      });
    } else {
      startTransition(() => {
        updateOpeningHoursForHealthcareCenter(data)
          .then((data) => {
            if (data?.error) {
              setError(data.error);
            }
            if (data?.success) {
              setSuccess(data.success);
            }
          })
          .catch(() => {
            setError("Something went wrong");
          });
      });
    }
  };
  return (
    <div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Opening Hours</h2>
          <p className="text-sm text-muted-foreground">
            Set your opening hours for each day of the week here.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="white"
            onClick={() => manageOpeningHoursForm.reset()}
            disabled={isPending || !manageOpeningHoursForm.formState.isDirty}
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            type="submit"
            form="manage-profile-form"
            className="flex items-center justify-center"
            onClick={manageOpeningHoursForm.handleSubmit(onSubmit)}
            disabled={
              isPending ||
              success !== "" ||
              !manageOpeningHoursForm.formState.isDirty
            }
          >
            {isPending ? (
              <>
                <Spinner className="mr-2" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <Form {...manageOpeningHoursForm}>
        <form
          onSubmit={manageOpeningHoursForm.handleSubmit(onSubmit)}
          className="mt-8 grid gap-6"
          id="manage-opening-hours-form"
        >
          <FormSuccess message={success} />
          <FormError message={error} />
          {manageOpeningHoursForm
            .getValues()
            .openingHours.map((openingHour, index) => (
              <div
                className="flex items-center justify-between space-x-4 rounded-lg border bg-white px-8 py-4 shadow-sm"
                key={index}
              >
                <FormField
                  control={manageOpeningHoursForm.control}
                  name={`openingHours.${index}.isClosed`}
                  key={`isClosed-${index}`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-4">
                      <FormLabel
                        htmlFor={`openingHours.${index}.isClosed`}
                        className="mt-1"
                      >
                        {getDayStringByIndex(openingHour.dayOfWeek)}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-sm font-medium">
                            {field.value ? "Closed" : "Open"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-4">
                  <FormField
                    control={manageOpeningHoursForm.control}
                    name={`openingHours.${index}.startTime`}
                    key={`startTime-${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`openingHours.${index}.startTime`}>
                          Opens at
                        </FormLabel>
                        <FormControl>
                          <TimePicker
                            onChange={field.onChange}
                            value={field.value}
                            className={cn(
                              openingHour.isClosed &&
                                "pointer-events-none cursor-not-allowed opacity-50",
                            )}
                          >
                            <TimePickerSegment segment={"hours"} />
                            <TimePickerSeparator>:</TimePickerSeparator>
                            <TimePickerSegment segment={"minutes"} />
                          </TimePicker>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={manageOpeningHoursForm.control}
                    name={`openingHours.${index}.endTime`}
                    key={`endTime-${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`openingHours.${index}.endTime`}>
                          Closes at
                        </FormLabel>
                        <FormControl>
                          <TimePicker
                            onChange={field.onChange}
                            value={field.value}
                            className={cn(
                              openingHour.isClosed &&
                                "pointer-events-none cursor-not-allowed opacity-50",
                            )}
                          >
                            <TimePickerSegment segment={"hours"} />
                            <TimePickerSeparator>:</TimePickerSeparator>
                            <TimePickerSegment segment={"minutes"} />
                          </TimePicker>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
        </form>
      </Form>
    </div>
  );
}
