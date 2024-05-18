"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { getHealthCareProviderById } from "@/actions/healthcare-provider";
import { BookAppointmentWithSpecialist } from "@/actions/patient";
import {
  BookAppointmentWithSpecialistSchema,
  BookAppointmentWithSpecialistSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { format, isBefore, isEqual } from "date-fns";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSignInDialog } from "@/hooks/use-sign-in-dialog";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";

import { AdditionalImagesDropzone } from "../book-appointment/additional-images-dropzone";

type FieldName = keyof BookAppointmentWithSpecialistSchemaType;

interface StepsType {
  id: string;
  name: string;
  fields?: FieldName[];
}

const steps: StepsType[] = [
  {
    id: "date-time",
    name: "Date & Time",
    fields: ["date", "time"],
  },
  {
    id: "additional-information",
    name: "Additional Information",
    fields: ["additionalImages"],
  },
  {
    id: "finish",
    name: "Finishing Touches",
  },
  {
    id: "submitted",
    name: "Appointment Submitted",
  },
];

interface BookAppointmentWithSpecialistFormProps {
  date: string;
  healthcareProvider: Awaited<ReturnType<typeof getHealthCareProviderById>>;
  timeSlots: Date[];
}

export function BookAppointmentWithSpecialistForm({
  date,
  healthcareProvider,
  timeSlots,
}: BookAppointmentWithSpecialistFormProps) {
  const authenticatedUser = useCurrentUser();
  const signInDialog = useSignInDialog();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [previousStep, setPreviousStep] = React.useState<number>(0);
  const [isPending, startTransition] = React.useTransition();
  const delta = currentStep - previousStep;

  const bookAppointmentForm = useForm<BookAppointmentWithSpecialistSchemaType>({
    resolver: zodResolver(BookAppointmentWithSpecialistSchema),
    defaultValues: {
      date: new Date(date),
      additionalImages: [],
    },
  });

  const processForm = async (
    values: BookAppointmentWithSpecialistSchemaType,
  ) => {
    startTransition(() => {
      BookAppointmentWithSpecialist(values, healthcareProvider?.id)
        .then((data) => {
          if (data?.error) {
            bookAppointmentForm.reset();
            setCurrentStep(0);
          }
        })
        .catch(() => {
          console.error("Something went wrong");
        });
    });
  };

  const next = async () => {
    if (!authenticatedUser) {
      signInDialog.setOpen(true);
      return;
    }

    const fields = steps[currentStep].fields;

    const output = await bookAppointmentForm.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await bookAppointmentForm.handleSubmit(processForm)();
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

  function getDay(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const selectedTime = bookAppointmentForm.watch("time");

  return (
    <Form {...bookAppointmentForm}>
      <form className="space-y-6 pb-10">
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-semibold">Date And Time</h3>
              <p className="text-sm text-muted-foreground">
                Select the date and time for your appointment.
              </p>
              <p className="text-sm text-muted-foreground">
                You are booking an appointment for{" "}
                <span className="font-semibold">{getDay(new Date(date))}</span>
              </p>
            </div>

            <FormField
              control={bookAppointmentForm.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-1 pt-4">
                  <FormLabel>Appointment Time</FormLabel>
                  <FormDescription>
                    Select the time for your appointment.
                  </FormDescription>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-8 gap-4 pt-4"
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
                                    isEqual(new Date(appointment.date), date) &&
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
                                  (isEqual(new Date(appointment.date), date) &&
                                    isEqual(
                                      new Date(appointment.startTime),
                                      time,
                                    )) ||
                                  isBefore(time, new Date()),
                              ) && "cursor-not-allowed opacity-50",
                            )}
                          >
                            <CardContent className="flex items-center justify-between px-4 py-2.5 text-sm">
                              {format(time, "HH:mm")}
                              {isEqual(selectedTime, time) && (
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
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-semibold">Additional Information</h3>
              <p className="text-sm text-muted-foreground">
                Provide any additional information that you think is important.
              </p>
            </div>

            <FormField
              control={bookAppointmentForm.control}
              name="additionalImages"
              render={({ field }) => (
                <FormItem className="pt-4">
                  <FormLabel>Additional Images</FormLabel>
                  <FormControl>
                    <AdditionalImagesDropzone
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload any additional images that you think are important.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-1">
              <h3 className="font-semibold">Finishing Touches</h3>
              <p className="text-sm text-muted-foreground">
                Review the information you have provided before submitting.
              </p>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-start border-b bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      <span>
                        Appointment with{" "}
                        <span className="font-semibold">
                          Dr. {healthcareProvider?.user.name}
                        </span>
                      </span>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Summary of your appointment details.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-2">
                    <div className="font-semibold">Date & Time</div>
                    <div>
                      {getDay(bookAppointmentForm.watch("date"))}, at{" "}
                      {format(selectedTime, "hh:mm a")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex w-full flex-col items-center space-y-4 rounded-xl border bg-white p-8">
              <h3 className="text-xl font-semibold tracking-tight text-blue-600">
                {isPending
                  ? "Booking your appointment..."
                  : "Appointment Booked"}
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
                  Please wait while we book your appointment.
                </div>
              ) : (
                <div className="max-w-[300px] text-center text-sm text-muted-foreground">
                  Your appointment has been successfully submitted. You will
                  receive a confirmation email shortly.
                </div>
              )}
              {!isPending && (
                <div className="flex items-center justify-center gap-x-2 pt-2">
                  <Button
                    type="button"
                    variant="blue"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Book Another
                  </Button>
                  <Button
                    type="button"
                    variant="white"
                    onClick={() => {
                      router.push("/patient/dashboard");
                    }}
                  >
                    Go to your dashboard
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {currentStep !== 4 && (
          <div className="flex items-center justify-end gap-x-2">
            <Button
              type="button"
              variant="blue"
              onClick={next}
              disabled={isPending}
            >
              {isPending ? <Spinner className="mr-2" /> : null}
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>

            <Button
              type="button"
              onClick={previous}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
