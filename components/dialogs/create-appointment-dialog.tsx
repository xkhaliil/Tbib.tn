"use client";

import React from "react";

import { createAppointment } from "@/actions/appointment";
import { getAllPatients } from "@/actions/patient";
import {
  CreateAppointmentSchema,
  CreateAppointmentSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Absence } from "@prisma/client";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { format, isBefore, startOfDay, startOfToday } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useCreateAppointmentDialog } from "@/hooks/use-create-appointment-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  TimePicker,
  TimePickerSegment,
  TimePickerSeparator,
} from "@/components/ui/time-picker";
import { MainDialog } from "@/components/main-dialog";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "UPCOMING";

type TagColors = {
  [key in AppointmentStatus]: "default" | "warning" | "success";
};

const tagColors: TagColors = {
  PENDING: "warning",
  CONFIRMED: "default",
  UPCOMING: "success",
};

const tagColorsArray = Object.keys(tagColors);

interface CreateAppointmentDialogProps {
  absences: Absence[] | undefined;
  patients: Awaited<ReturnType<typeof getAllPatients>>;
}

export function CreateAppointmentDialog({
  absences,
  patients,
}: CreateAppointmentDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const createAppointmentDialog = useCreateAppointmentDialog();

  const form = useForm<CreateAppointmentSchemaType>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      title: "",
      description: "",
      day: new Date(),
      startTime: new Date(new Date().setHours(8, 0, 0, 0)),
      endTime: new Date(new Date().setHours(9, 0, 0, 0)),
      status: "PENDING",
      patientId: "",
    },
  });

  const handleSubmit: SubmitHandler<CreateAppointmentSchemaType> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createAppointment(data)
        .then((res) => {
          if (res?.success) {
            createAppointmentDialog.setOpen(false);
            toast.message("Appointment created successfully.", {
              description: data.day
                ? format(data.day, "EEEE, MMMM dd, yyyy") +
                  " at " +
                  format(data.startTime, "H:mm")
                : "",
            });
            form.reset();
          } else if (res?.error) {
            setError(res.error);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };
  return (
    <MainDialog
      open={createAppointmentDialog.open}
      setOpen={createAppointmentDialog.setOpen}
    >
      <div className="flex flex-col space-y-1 pb-6">
        <h1 className="text-2xl font-bold">Create a new appointment</h1>
        <p className="text-muted-foreground">
          Create a new appointment with the details below.
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {patients?.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.user.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="mt-1 flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[314px] p-0" align="start">
                      <Calendar
                        selectedDay={field.value}
                        setSelectedDay={field.onChange}
                        disabledDates={(date) => {
                          const currentDate = startOfToday();
                          const inputDate = startOfDay(date);
                          return isBefore(inputDate, currentDate);
                        }}
                        absences={absences}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <TimePicker onChange={field.onChange} value={field.value}>
                      <TimePickerSegment segment={"hours"} />
                      <TimePickerSeparator>:</TimePickerSeparator>
                      <TimePickerSegment segment={"minutes"} />
                      <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                    </TimePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <TimePicker onChange={field.onChange} value={field.value}>
                      <TimePickerSegment segment={"hours"} />
                      <TimePickerSeparator>:</TimePickerSeparator>
                      <TimePickerSegment segment={"minutes"} />
                      <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                    </TimePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-1"
                  >
                    {tagColorsArray.map((tag) => (
                      <FormItem key={tag}>
                        <FormLabel>
                          <FormControl>
                            <RadioGroupItem value={tag} className="sr-only" />
                          </FormControl>

                          <Badge
                            className="cursor-pointer"
                            // @ts-ignore
                            variant={tagColors[tag]}
                          >
                            {field.value === tag && (
                              <span
                                className={cn(
                                  "mr-1.5 h-1.5 w-1.5 rounded-full",
                                  tagColors[tag] === "warning" &&
                                    "bg-warning-foreground",
                                  tagColors[tag] === "success" &&
                                    "bg-success-foreground",
                                  tagColors[tag] === "default" &&
                                    "bg-primary-foreground",
                                )}
                              ></span>
                            )}
                            <span className="text-xs">
                              {tag.charAt(0) + tag.slice(1).toLowerCase()}
                            </span>
                          </Badge>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => createAppointmentDialog.setOpen(false)}
              disabled={isPending}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner className="mr-2" /> : null}
              <span>{isPending ? "Creating..." : "Create appointment"}</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </MainDialog>
  );
}
