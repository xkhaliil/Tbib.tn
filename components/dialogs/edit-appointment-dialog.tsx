"use client";

import React from "react";

import { editAppointment } from "@/actions/appointment";
import { EditAppointmentSchema, EditAppointmentSchemaType } from "@/schemas";
import { AppointmentWithPatient } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Absence, AppointmentStatus } from "@prisma/client";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { differenceInYears, format, isBefore } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  TimePicker,
  TimePickerSegment,
  TimePickerSeparator,
} from "@/components/ui/time-picker";
import { MainDialog } from "@/components/main-dialog";

type TagColors = {
  [key in AppointmentStatus]: string;
};

const tagColors: TagColors = {
  PENDING: "warning",
  CONFIRMED: "default",
  UPCOMING: "success",
  CANCELLED: "destructive",
  EXPIRED: "destructiveOutline",
  COMPLETED: "info",
};

const tagColorsArray = Object.keys(tagColors);

interface EditAppointementDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  appointment: AppointmentWithPatient | undefined;
  absences?: Absence[];
}

export function EditAppointementDialog({
  open,
  setOpen,
  appointment,
  absences,
}: EditAppointementDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [absencesList, setAbsencesList] = React.useState<Absence[]>(
    absences || [],
  );

  const form = useForm<EditAppointmentSchemaType>({
    resolver: zodResolver(EditAppointmentSchema),
    defaultValues: {
      title: appointment?.title,
      description: appointment?.description || "",
      day: appointment?.date,
      startTime: appointment?.startTime,
      endTime: appointment?.endTime,
      status: appointment?.status,
    },
  });

  React.useEffect(() => {
    form.reset({
      title: appointment?.title,
      description: appointment?.description || "",
      day: appointment?.date,
      startTime: appointment?.startTime,
      endTime: appointment?.endTime,
      status: appointment?.status,
    });

    setAbsencesList(absences || []);
  }, [appointment, absences]);

  const handleSubmit: SubmitHandler<EditAppointmentSchemaType> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      editAppointment(appointment?.id, data)
        .then((res) => {
          if (res?.success) {
            setOpen(false);
            toast.message("Schedule has been updated.", {
              description: "Check your updated schedule in the calendar.",
              descriptionClassName: "text-muted-foreground text-xs",
            });
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
    <MainDialog open={open} setOpen={setOpen}>
      <div className="flex flex-col space-y-1 pb-6">
        <h1 className="text-2xl font-bold">
          {appointment?.title || "Edit Appointment"}
        </h1>
        <p className="text-muted-foreground">
          {appointment?.description || "Edit the appointment details."}
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="patient">
              <AccordionTrigger className="rounded-lg bg-secondary px-4 data-[state=open]:rounded-bl-none data-[state=open]:rounded-br-none">
                Patient Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col rounded-bl-lg rounded-br-lg border-t-0 bg-secondary p-4">
                  <h2 className="text-sm font-semibold">Patient Details</h2>
                  <Separator className="my-2.5" />
                  <div className="mt-2 flex items-center gap-x-4">
                    <Avatar>
                      {appointment?.patient?.user.image && (
                        <AvatarImage
                          src={appointment?.patient?.user.image}
                          alt={appointment?.patient?.user.name}
                        />
                      )}
                      <AvatarFallback>
                        {appointment?.patient?.user.name
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col text-sm">
                      <h2 className="text-sm font-semibold">
                        {appointment?.patient?.user.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {appointment?.patient?.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex flex-col rounded-lg border bg-white p-4">
                      <h2 className="text-sm font-semibold">
                        Personal Details
                      </h2>

                      <div className="mt-2 flex flex-col space-y-2">
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold">Gender</h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment?.patient.user.gender}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-col space-y-2">
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold">Age</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              appointment?.patient?.user.dateOfBirth!,
                              "dd/MM/yyyy",
                            )}{" "}
                            <span className="text-muted-foreground">
                              (
                              {differenceInYears(
                                new Date(),
                                appointment?.patient?.user.dateOfBirth!,
                              )}{" "}
                              years)
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-lg border bg-white p-4">
                      <h2 className="text-sm font-semibold">Contact Details</h2>

                      <div className="mt-2 flex flex-col space-y-2">
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold">Phone</h3>
                          <p className="text-sm text-muted-foreground">
                            (+216) {appointment?.patient?.user.phone}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-col space-y-2">
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold">Address</h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment?.patient?.user.state},{" "}
                            {appointment?.patient?.user.city},{" "}
                            {appointment?.patient?.user.postalCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
                          return isBefore(date, new Date());
                        }}
                        absences={absencesList}
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
          </div>

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
                                tagColors[tag] === "destructive" &&
                                  "bg-destructive-foreground",
                                tagColors[tag] === "destructiveOutline" &&
                                  "bg-rose-500",
                                tagColors[tag] === "info" &&
                                  "bg-info-foreground",
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

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || !form.formState.isDirty}
            >
              {isPending ? <Spinner className="mr-2" /> : null}
              <span>{isPending ? "Saving..." : "Save"}</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </MainDialog>
  );
}
