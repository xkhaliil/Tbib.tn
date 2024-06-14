"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { saveConsultation } from "@/actions/consultation";
import { getPatientRecord } from "@/actions/patient";
import {
  CreateConsultationSchema,
  CreateConsultationSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrescriptionType } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isBefore, startOfToday } from "date-fns";
import {
  BoneIcon,
  FileBadgeIcon,
  MicroscopeIcon,
  TabletsIcon,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaBandage } from "react-icons/fa6";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

interface CreateConsultationFormProps {
  record: Awaited<ReturnType<typeof getPatientRecord>>;
  appointmentId: string;
}

export function CreateConsultationForm({
  record,
  appointmentId,
}: CreateConsultationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [prescriptionType, setPrescriptionType] =
    React.useState<PrescriptionType>(PrescriptionType.MEDICAL_PRESCRIPTION);

  const createConsultationForm = useForm<CreateConsultationSchemaType>({
    resolver: zodResolver(CreateConsultationSchema),
    defaultValues: {
      prescription: {
        type: PrescriptionType.MEDICAL_PRESCRIPTION,
        date: new Date(),
        medications: [{ name: " ", dosage: " ", duration: " " }],
      },
    },
  });

  let treatmentPlanFormContent = null;

  const { fields, append, remove } = useFieldArray({
    name: "prescription.medications",
    control: createConsultationForm.control,
  });

  const onSubmit = async (data: CreateConsultationSchemaType) => {
    startTransition(() => {
      saveConsultation(record?.patientId, appointmentId, record?.id, data)
        .then((data) => {
          if (data?.success) {
            toast.success("Consultation saved successfully.");
            router.push("/hp/dashboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  if (prescriptionType === PrescriptionType.MEDICAL_PRESCRIPTION) {
    treatmentPlanFormContent = (
      <>
        {fields.map((field, index) => (
          <FormField
            control={createConsultationForm.control}
            key={field.id}
            name={`prescription.medications.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medication {index + 1}</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid grid-cols-5 gap-2">
                      <Input
                        type="text"
                        placeholder="Name"
                        {...createConsultationForm.register(
                          `prescription.medications.${index}.name`,
                        )}
                        className="col-span-2"
                      />
                      <Input
                        type="text"
                        placeholder="Dosage"
                        {...createConsultationForm.register(
                          `prescription.medications.${index}.dosage`,
                        )}
                      />
                      <Input
                        type="text"
                        placeholder="Duration"
                        {...createConsultationForm.register(
                          `prescription.medications.${index}.duration`,
                        )}
                      />
                      {index === fields.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            append({ name: " ", dosage: " ", duration: " " })
                          }
                          className="col-span-1 text-xs"
                          disabled={isPending}
                        >
                          Add Medication
                        </Button>
                      )}

                      {index !== fields.length - 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                          className="col-span-1 text-xs"
                          disabled={isPending}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </>
    );
  }

  if (prescriptionType === PrescriptionType.BIOLOGY_TEST) {
    treatmentPlanFormContent = (
      <>
        <FormField
          control={createConsultationForm.control}
          name="prescription.biologyTestType"
          render={({ field }) => (
            <FormItem className="col-span-1 flex flex-col">
              <FormLabel>Test Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="blood">Blood Test</SelectItem>
                  <SelectItem value="urine">Urine Test</SelectItem>
                  <SelectItem value="stool">Stool Test</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createConsultationForm.control}
          name="prescription.biologyTestReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reason{" "}
                <span className="text-muted-foreground">
                  (Why is the test being conducted?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createConsultationForm.control}
          name="prescription.biologyTestNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Additional Notes{" "}
                <span className="text-muted-foreground">
                  (Any additional notes about the test?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (prescriptionType === PrescriptionType.IMAGINING_STUDY) {
    treatmentPlanFormContent = (
      <>
        <FormField
          control={createConsultationForm.control}
          name="prescription.imagingStudyType"
          render={({ field }) => (
            <FormItem className="col-span-1 flex flex-col">
              <FormLabel>Study Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a study type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="x-ray">X-Ray</SelectItem>
                  <SelectItem value="mri">MRI</SelectItem>
                  <SelectItem value="ct">CT Scan</SelectItem>
                  <SelectItem value="ultrasound">Ultrasound</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createConsultationForm.control}
          name="prescription.imagingStudyReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reason{" "}
                <span className="text-muted-foreground">
                  (Why is the study being conducted?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createConsultationForm.control}
          name="prescription.imagingStudyNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Additional Notes{" "}
                <span className="text-muted-foreground">
                  (Any additional notes about the study?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (prescriptionType === PrescriptionType.MEDICAL_CERTIFICATE) {
    treatmentPlanFormContent = (
      <>
        <FormField
          control={createConsultationForm.control}
          name="prescription.medicalCertificateType"
          render={({ field }) => (
            <FormItem className="col-span-1 flex flex-col">
              <FormLabel>Certificate Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a certificate type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="fit">Fitness Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={createConsultationForm.control}
            name="prescription.medicalCertificateStartDate"
            render={({ field }) => (
              <FormItem className="mt-1 flex flex-col">
                <FormLabel>
                  Start Date{" "}
                  <span className="text-muted-foreground">
                    (When does the certificate start?)
                  </span>
                </FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={isPending}
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
                  <PopoverContent className="w-[320px] p-0" align="start">
                    <Calendar
                      selectedDay={field.value || startOfToday()}
                      setSelectedDay={field.onChange}
                      disabledDates={(date) => {
                        return isBefore(date, startOfToday());
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={createConsultationForm.control}
            name="prescription.medicalCertificateEndDate"
            render={({ field }) => (
              <FormItem className="mt-1 flex flex-col">
                <FormLabel>
                  End Date{" "}
                  <span className="text-muted-foreground">
                    (When does the certificate end?)
                  </span>
                </FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={isPending}
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
                  <PopoverContent className="w-[320px] p-0" align="start">
                    <Calendar
                      selectedDay={field.value || startOfToday()}
                      setSelectedDay={field.onChange}
                      disabledDates={(date) => {
                        return isBefore(date, startOfToday());
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={createConsultationForm.control}
          name="prescription.medicalCertificatePurpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reason{" "}
                <span className="text-muted-foreground">
                  (Why is the certificate being issued?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createConsultationForm.control}
          name="prescription.medicalCertificateNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Additional Notes{" "}
                <span className="text-muted-foreground">
                  (Any additional notes about the certificate?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (prescriptionType === PrescriptionType.PARAMEDICAL_ACT) {
    treatmentPlanFormContent = (
      <>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={createConsultationForm.control}
            name="prescription.paramedicalActType"
            render={({ field }) => (
              <FormItem className="col-span-1 flex flex-col">
                <FormLabel>Act Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an act type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                    <SelectItem value="counseling">Counseling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={createConsultationForm.control}
            name="prescription.paramedicalActDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Duration{" "}
                  <span className="text-muted-foreground">
                    (How long will the act take?)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Duartion"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={createConsultationForm.control}
          name="prescription.paramedicalActReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reason{" "}
                <span className="text-muted-foreground">
                  (Why is the act being conducted?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createConsultationForm.control}
          name="prescription.paramedicalActNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Additional Notes{" "}
                <span className="text-muted-foreground">
                  (Any additional notes about the act?)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Medical Observation</CardTitle>
          <CardDescription>
            Enter your observations about the patient&apos;s medical condition.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <Form {...createConsultationForm}>
            <form
              className="space-y-4"
              onSubmit={createConsultationForm.handleSubmit(onSubmit)}
              id="create-consultation-form"
            >
              <FormField
                control={createConsultationForm.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Diagnosis{" "}
                      <span className="text-muted-foreground">
                        (What is the patient&apos;s medical condition?)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createConsultationForm.control}
                name="followUp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Follow Up{" "}
                      <span className="text-muted-foreground">
                        (What is the patient&apos;s follow up plan?)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createConsultationForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Additional Notes{" "}
                      <span className="text-muted-foreground">
                        (Any additional notes about the patient&apos;s
                        condition?)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-1.5">
              <h1 className="font-semibold leading-none tracking-tight">
                Follow Up Information
              </h1>
              <p className="text-sm text-muted-foreground">
                This section contains the patient&apos;s follow up information.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <h1 className="text-sm font-semibold tracking-tight">Height</h1>
                <div className="flex flex-col text-right">
                  <p className="text-xs">{record?.height || "Not available"}</p>
                  <span className="text-xs text-muted-foreground">
                    Last modified on{" "}
                    {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-4">
                <h1 className="text-sm font-semibold tracking-tight">Weight</h1>
                <div className="flex flex-col text-right">
                  <p className="text-xs">{record?.weight || "Not available"}</p>
                  <span className="text-xs text-muted-foreground">
                    Last modified on{" "}
                    {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-4">
                <h1 className="text-sm font-semibold tracking-tight">
                  Blood Pressure
                </h1>
                <div className="flex flex-col text-right">
                  <p className="text-xs">
                    {record?.bloodPressure || "Not available"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Last modified on{" "}
                    {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-4">
                <h1 className="text-sm font-semibold tracking-tight">BMI</h1>
                <div className="flex flex-col text-right">
                  <p className="text-xs">{record?.bmi || "Not available"}</p>
                  <span className="text-xs text-muted-foreground">
                    Last modified on{" "}
                    {format(record?.updatedAt || new Date(), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Treatment Plan</CardTitle>
          <CardDescription>
            Choose a suitable treatment plan for the patient.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <PrescriptionTypeButton
              prescriptionType={PrescriptionType.MEDICAL_PRESCRIPTION}
              setPrescriptionType={setPrescriptionType}
              icon={TabletsIcon}
              title="Medication Prescription"
              selected={
                prescriptionType === PrescriptionType.MEDICAL_PRESCRIPTION
              }
            />

            <PrescriptionTypeButton
              prescriptionType={PrescriptionType.BIOLOGY_TEST}
              setPrescriptionType={setPrescriptionType}
              icon={MicroscopeIcon}
              title="Biology Prescription"
              selected={prescriptionType === PrescriptionType.BIOLOGY_TEST}
            />

            <PrescriptionTypeButton
              prescriptionType={PrescriptionType.IMAGINING_STUDY}
              setPrescriptionType={setPrescriptionType}
              icon={BoneIcon}
              title="Imaging Prescription"
              selected={prescriptionType === PrescriptionType.IMAGINING_STUDY}
            />

            <PrescriptionTypeButton
              prescriptionType={PrescriptionType.MEDICAL_CERTIFICATE}
              setPrescriptionType={setPrescriptionType}
              icon={FileBadgeIcon}
              title="Medical Certificate"
              selected={
                prescriptionType === PrescriptionType.MEDICAL_CERTIFICATE
              }
            />

            <PrescriptionTypeButton
              prescriptionType={PrescriptionType.PARAMEDICAL_ACT}
              setPrescriptionType={setPrescriptionType}
              icon={FaBandage}
              title="Paramedical Act"
              selected={prescriptionType === PrescriptionType.PARAMEDICAL_ACT}
            />
          </div>

          <Form {...createConsultationForm}>
            <form
              className="space-y-4 pt-6"
              onSubmit={createConsultationForm.handleSubmit(onSubmit)}
              id="create-consultation-form"
            >
              {treatmentPlanFormContent}
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="col-start-2 flex justify-end">
        <Button
          variant="blue"
          size="lg"
          form="create-consultation-form"
          type="submit"
          disabled={isPending}
        >
          {isPending && <Spinner className="mr-2" />}
          Save Consultation
        </Button>
      </div>
    </>
  );
}

interface PrescriptionTypeButtonProps {
  prescriptionType: PrescriptionType;
  setPrescriptionType: React.Dispatch<React.SetStateAction<PrescriptionType>>;
  icon: React.ElementType;
  title: string;
  selected: boolean;
}

function PrescriptionTypeButton({
  prescriptionType,
  setPrescriptionType,
  icon: Icon,
  title,
  selected,
}: PrescriptionTypeButtonProps) {
  return (
    <div
      onClick={() => {
        setPrescriptionType(prescriptionType);
      }}
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-lg border p-3.5 transition-all duration-300 ease-in-out hover:bg-muted",
        selected && "bg-muted",
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <p className="text-center text-xs font-semibold">{title}</p>
      </div>
    </div>
  );
}
