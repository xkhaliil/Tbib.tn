"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { getHealthCareProviderById } from "@/actions/healthcare-provider";
import { bookAppointment } from "@/actions/patient";
import { symptomsTypes, SymptomType } from "@/constants";
import { BookAppointmentSchema, BookAppointmentSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { format, isEqual } from "date-fns";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { AdditionalImagesDropzone } from "../book-appointment/additional-images-dropzone";
import { SymptomsCard } from "../symptoms-card";

type FieldName = keyof BookAppointmentSchemaType;

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
    id: "symptoms",
    name: "Symptoms",
    fields: [
      "symptomsType",
      "symptoms",
      "symptomsDuration",
      "symptomsLength",
      "symptomsSeverity",
    ],
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

interface BookAppointmentFormProps {
  date: string;
  healthcareProvider: Awaited<ReturnType<typeof getHealthCareProviderById>>;
  timeSlots: Date[];
}

export function BookAppointmentForm({
  date,
  healthcareProvider,
  timeSlots,
}: BookAppointmentFormProps) {
  const authenticatedUser = useCurrentUser();
  const signInDialog = useSignInDialog();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [previousStep, setPreviousStep] = React.useState<number>(0);
  const [isPending, startTransition] = React.useTransition();
  const delta = currentStep - previousStep;

  const bookAppointmentForm = useForm<BookAppointmentSchemaType>({
    resolver: zodResolver(BookAppointmentSchema),
    defaultValues: {
      date: new Date(date),
      symptomsType: SymptomType.MUSCLES_JOINTS,
      symptoms: "",
      symptomsDuration: "1",
      symptomsLength: "DAYS",
      symptomsSeverity: "LOW",
      additionalImages: [],
    },
  });

  const processForm = async (values: BookAppointmentSchemaType) => {
    startTransition(() => {
      bookAppointment(values, healthcareProvider?.id)
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
    const fields = steps[currentStep].fields;

    const output = await bookAppointmentForm.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    // Submit the form if it's the last step
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        if (!authenticatedUser) {
          signInDialog.setOpen(true);
          return;
        }
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

  const selectedLength = bookAppointmentForm.watch("symptomsLength");
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
                              disabled={healthcareProvider?.appointments.some(
                                (appointment) =>
                                  isEqual(new Date(appointment.date), date) &&
                                  isEqual(
                                    new Date(appointment.startTime),
                                    time,
                                  ),
                              )}
                            />
                          </FormControl>
                          <Card
                            key={time.toString()}
                            className={cn(
                              "w-full cursor-pointer",
                              healthcareProvider?.appointments.some(
                                (appointment) =>
                                  isEqual(new Date(appointment.date), date) &&
                                  isEqual(
                                    new Date(appointment.startTime),
                                    time,
                                  ),
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
            <div className="grid grid-cols-1 place-content-between gap-6 lg:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <h3 className="text-sm font-semibold">Symptoms Information</h3>
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
                              <FormLabel className="ring-white/60 ring-offset-2 ring-offset-blue-600 [&:has([data-state=checked])>div]:ring-2">
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

            <Separator className="my-6" />

            <div className="grid grid-cols-1 place-content-between gap-6 lg:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <h3 className="text-sm font-semibold">Symptoms Details</h3>
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
                                    {value.charAt(0) +
                                      value.slice(1).toLowerCase()}
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
                                    {value.charAt(0) +
                                      value.slice(1).toLowerCase()}
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
          </motion.div>
        )}

        {currentStep === 2 && (
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

        {currentStep === 3 && (
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

                  <Separator className="my-4" />

                  <div className="grid gap-2">
                    <div className="font-semibold">Symptoms Type</div>
                    <div>
                      {
                        symptomsTypes.find(
                          (type) =>
                            type.value ===
                            bookAppointmentForm.watch("symptomsType"),
                        )?.title
                      }
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-2">
                    <div className="font-semibold">Symptoms Description</div>
                    <div>{bookAppointmentForm.watch("symptoms")}</div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-2">
                    <div className="font-semibold">Symptoms Duration</div>
                    <div>
                      {bookAppointmentForm.watch("symptomsDuration")}{" "}
                      {bookAppointmentForm
                        .watch("symptomsLength")
                        ?.toLowerCase()}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-2">
                    <div className="font-semibold">Symptoms Severity</div>
                    <div>
                      {bookAppointmentForm
                        .watch("symptomsSeverity")
                        ?.charAt(0)
                        .toUpperCase()}
                      {bookAppointmentForm
                        .watch("symptomsSeverity")
                        ?.slice(1)
                        .toLowerCase()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
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
