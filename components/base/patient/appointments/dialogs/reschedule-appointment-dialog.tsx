"use client";

import React from "react";

import { getAppointmentWithHPById } from "@/actions/appointment";
import {
  getHealthCareProviderById,
  getHealthCareProviderTimeSlots,
} from "@/actions/healthcare-provider";
import { rescheduleAppointment } from "@/actions/patient";
import {
  RescheduleAppointmentSchema,
  RescheduleAppointmentSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appointment } from "@prisma/client";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameDay,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";

type FieldName = keyof RescheduleAppointmentSchemaType;

interface StepsType {
  id: string;
  name: string;
  fields?: FieldName[];
}

const steps: StepsType[] = [
  {
    id: "date",
    name: "Select Date",
    fields: ["date"],
  },
  {
    id: "time",
    name: "Select Time",
    fields: ["time"],
  },
  {
    id: "confirm",
    name: "Confirm",
  },
  {
    id: "finish",
    name: "Finish",
  },
];

interface RescheduleAppointmentDialogProps {
  appointment: Awaited<ReturnType<typeof getAppointmentWithHPById>>;
  healthcareProvider: Awaited<ReturnType<typeof getHealthCareProviderById>>;
}

export function RescheduleAppointmentDialog({
  appointment,
  healthcareProvider,
}: RescheduleAppointmentDialogProps) {
  const [timeSlots, setTimeSlots] = React.useState<Date[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [previousStep, setPreviousStep] = React.useState<number>(0);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const getIndexesOfClosedDays = () => {
    return healthcareProvider?.openingHours
      ?.filter((openingHour) => openingHour.isClosed)
      .map((openingHour) => openingHour.dayOfWeek);
  };

  const closedDays: number[] = [];

  for (let i = 0; i <= getIndexesOfClosedDays()?.length! ?? 0; i++) {
    const array = [
      getIndexesOfClosedDays()?.[i],
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 7,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 14,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 21,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 28,
      //@ts-ignore
      getIndexesOfClosedDays()?.[i] + 35,
    ];

    //@ts-ignore
    closedDays.push(...array);
  }

  const isClosed = (dayIndex: number) => {
    return closedDays.includes(dayIndex);
  };

  const rescheduleAppointmentForm = useForm<RescheduleAppointmentSchemaType>({
    resolver: zodResolver(RescheduleAppointmentSchema),
    defaultValues: {
      date: appointment?.date,
      time: appointment?.startTime.toString(),
    },
  });

  const processForm = async (values: RescheduleAppointmentSchemaType) => {
    startTransition(() => {
      rescheduleAppointment(appointment?.id, values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            console.error(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          console.error("Something went wrong");
        });
    });
  };

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await rescheduleAppointmentForm.trigger(
      fields as FieldName[],
      {
        shouldFocus: true,
      },
    );

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await rescheduleAppointmentForm.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const selectedDay = rescheduleAppointmentForm.watch("date");

  const handleGetTimeSlots = async (date: Date): Promise<Date[]> => {
    setTimeSlots([]);

    const timeSlots = await getHealthCareProviderTimeSlots(
      healthcareProvider?.id as string,
      date,
    );

    setTimeSlots(timeSlots);

    return timeSlots;
  };

  React.useEffect(() => {
    if (selectedDay) {
      handleGetTimeSlots(selectedDay);
    }
  }, [selectedDay]);

  const selectedTime = rescheduleAppointmentForm.watch("time");

  console.log(selectedDay);
  console.log(selectedTime);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="warning">Reschedule</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold leading-none tracking-tight">
              Reschedule Appointment
            </h1>
            <Badge variant="white" className="uppercase">
              # {appointment?.id}
            </Badge>
          </div>
        </DialogHeader>

        <Form {...rescheduleAppointmentForm}>
          <form>
            {currentStep === 0 && (
              <div className="flex flex-col rounded-xl border bg-card text-card-foreground">
                <div className="mb-6 flex items-center justify-between border-b bg-muted/40 p-7">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={previousMonth}
                  >
                    <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <h2 className="font-medium text-foreground">
                    {format(firstDayCurrentMonth, "MMMM yyyy")}
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                  >
                    <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 text-center text-sm leading-6 text-muted-foreground">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                <div className="mb-6 mt-2 grid grid-cols-7">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={cn(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        "py-1.5",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            healthcareProvider?.absences?.some((absence) =>
                              isSameDay(absence.date, day),
                            ) ||
                            isClosed(dayIdx) ||
                            isBefore(day, startOfToday())
                          )
                            return;
                          rescheduleAppointmentForm.setValue("date", day);
                        }}
                        className={cn(
                          isSameDay(day, selectedDay) &&
                            "bg-blue-600 text-white",
                          healthcareProvider?.absences?.some((absence) =>
                            isSameDay(absence.date, day),
                          ) &&
                            "cursor-not-allowed bg-[url('/images/pattern.png')] bg-cover",
                          isClosed(dayIdx) &&
                            "cursor-not-allowed bg-rose-400 text-white hover:bg-rose-400",
                          isBefore(day, startOfToday()) &&
                            "cursor-not-allowed opacity-50",
                          "mx-auto flex h-12 w-12 items-center justify-center rounded",
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <FormField
                control={rescheduleAppointmentForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="space-y-1 pt-4">
                    <FormLabel>Appointment Time</FormLabel>
                    <FormDescription>
                      Select the time for your appointment.
                    </FormDescription>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="grid grid-cols-6 gap-4 pt-4"
                    >
                      {timeSlots.map((time) => (
                        <FormItem key={time.toString()}>
                          <FormLabel className="ring-offset-2 ring-offset-blue-600 [&:has([data-state=checked])>div]:ring-2">
                            <FormControl>
                              <RadioGroupItem
                                value={time.toString()}
                                className="sr-only"
                                disabled={
                                  healthcareProvider?.appointments.some(
                                    (appointment) =>
                                      isEqual(
                                        new Date(appointment.date),
                                        selectedDay,
                                      ) &&
                                      isEqual(
                                        new Date(appointment.startTime),
                                        time,
                                      ),
                                  ) || isBefore(time, new Date())
                                }
                              />
                            </FormControl>
                            <Card
                              key={time.toString()}
                              className={cn(
                                "w-full cursor-pointer",
                                healthcareProvider?.appointments.some(
                                  (appointment) =>
                                    (isEqual(
                                      new Date(appointment.date),
                                      selectedDay,
                                    ) &&
                                      isEqual(
                                        new Date(appointment.startTime),
                                        time,
                                      )) ||
                                    isBefore(time, new Date()) ||
                                    isEqual(
                                      new Date(appointment.startTime),
                                      time,
                                    ),
                                ) && "cursor-not-allowed opacity-50",
                              )}
                            >
                              <CardContent className="flex items-center justify-between px-4 py-2.5 text-sm">
                                {format(time, "HH:mm")}
                                {isEqual(time, selectedTime) && (
                                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                                    <CheckIcon className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                    <FormMessage className="pt-4" />
                  </FormItem>
                )}
              />
            )}

            {currentStep === 2 && (
              <div className="flex flex-col rounded-xl border bg-card text-card-foreground">
                <div className="flex items-center justify-between border-b bg-muted/40 p-7">
                  <h2 className="font-medium text-foreground">
                    Confirm Appointment
                  </h2>
                </div>
                <div className="flex items-center justify-between border-b p-7">
                  <div>
                    <p className="font-semibold">
                      New appointment with {healthcareProvider?.user.name} on
                    </p>
                    <p className="text-muted-foreground">
                      {format(selectedDay, "EEEE, dd MMMM yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-muted-foreground">
                      {format(selectedTime, "HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex w-full flex-col items-center space-y-4 rounded-xl border bg-white p-8">
                <h3 className="text-xl font-semibold tracking-tight text-blue-600">
                  {isPending
                    ? "Rescheduling your appointment..."
                    : "Appointment Rescheduled!"}
                </h3>
                {isPending ? (
                  <Spinner className="h-12 w-12 text-blue-600" />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-blue-600 bg-blue-500/80">
                    <CheckIcon className="h-16 w-16 text-white" />
                  </div>
                )}
                {isPending ? (
                  <div className="text-sm text-muted-foreground">
                    Please wait while we reschedule your appointment.
                  </div>
                ) : (
                  <div className="max-w-[300px] text-center text-sm text-muted-foreground">
                    <p>
                      Your appointment has been successfully rescheduled with{" "}
                      {healthcareProvider?.user.name}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </form>
        </Form>
        <DialogFooter>
          {currentStep !== 3 && (
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={previous}
                disabled={currentStep === 0 || currentStep === steps.length - 1}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="blue"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="w-full"
                size="lg"
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
