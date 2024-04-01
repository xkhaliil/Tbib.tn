"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/sign-up";
import { specialties, states } from "@/constants";
import { DoctorIcon } from "@/icons/doctor-icon";
import { HealthcareCenterIcon } from "@/icons/healthcare-center-icon";
import { MedicalMaskIcon } from "@/icons/medical-mask-icon";
import { SignUpSchema, SignUpSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import {
  CheckCircledIcon,
  CheckIcon,
  Cross2Icon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

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
import { Logo } from "@/components/marketing/logo";
import { RoleCard } from "@/components/role-card";

import { DocumentsUploadDropzone } from "../documents-upload-dropzone";

type FieldName = keyof SignUpSchemaType;

interface StepsType {
  id: string;
  name: string;
  fields?: FieldName[];
}

const steps: StepsType[] = [
  {
    id: "role",
    name: "Role Selection",
    fields: ["role"],
  },
  {
    id: "personal",
    name: "Fundamental Information",
    fields: [
      "name",
      "email",
      "phone",
      "speciality",
      "state",
      "city",
      "postalCode",
      "verificationDocuments",
    ],
  },
  {
    id: "password",
    name: "Security and Privacy",
    fields: ["password", "confirmPassword"],
  },
  {
    id: "finish",
    name: "Finishing Touches",
  },
];

export function SignUpForm() {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [previousStep, setPreviousStep] = React.useState<number>(0);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const delta = currentStep - previousStep;

  const signUpForm = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: Role.PATIENT,
      speciality: "",
      state: "",
      city: "",
      postalCode: "",
      verificationDocuments: [],
    },
  });

  const processForm = async (values: SignUpSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signUp(values)
        .then((data) => {
          if (data?.error) {
            signUpForm.reset();
            setError(data.error);
          }

          if (data?.success) {
            signUpForm.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await signUpForm.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await signUpForm.handleSubmit(processForm)();
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

  const selectedRole = signUpForm.watch("role");

  return (
    <div className="w-full max-w-md p-6 xl:max-w-[600px]">
      <div className="flex flex-col items-center space-y-3">
        <Logo />
        <h1 className="text-3xl font-bold">Sign Up to Oladoc</h1>

        <p className="text-center text-muted-foreground">
          Begin your journey with Oladoc by signing up.
        </p>
      </div>

      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(processForm)} className="pt-8">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormField
                control={signUpForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Role</FormLabel>
                    <FormDescription>
                      Select the role that best describes you.
                    </FormDescription>
                    <FormMessage />
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid max-w-xl grid-cols-1 grid-rows-3 gap-4 pt-4"
                    >
                      <FormItem>
                        <FormLabel className="ring-white/60 ring-offset-2 ring-offset-sky-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              value={Role.PATIENT}
                              className="sr-only"
                            />
                          </FormControl>
                          <RoleCard
                            title="Patient"
                            description="Book appointments, manage your health, and more."
                            checked={field.value === Role.PATIENT}
                            icon={MedicalMaskIcon}
                          />
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                        <FormLabel className="ring-white/60 ring-offset-2 ring-offset-sky-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              value={Role.HEALTHCARE_PROVIDER}
                              className="sr-only"
                            />
                          </FormControl>
                          <RoleCard
                            title="Healthcare Provider"
                            description="Manage appointments, patient records, and more."
                            checked={field.value === Role.HEALTHCARE_PROVIDER}
                            icon={DoctorIcon}
                          />
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                        <FormLabel className="ring-white/60 ring-offset-2 ring-offset-sky-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              value={Role.HEALTHCARE_CENTER}
                              className="sr-only"
                            />
                          </FormControl>
                          <RoleCard
                            title="Healthcare Center"
                            description="Manage your team, appointments, and more."
                            checked={field.value === Role.HEALTHCARE_CENTER}
                            icon={HealthcareCenterIcon}
                          />
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {currentStep === 1 && selectedRole === Role.HEALTHCARE_PROVIDER && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <>
                <FormField
                  control={signUpForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="speciality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speciality</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a speciality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectGroup key={specialty.category}>
                              <SelectLabel>{specialty.category}</SelectLabel>
                              {specialty.specialties.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>

              <div className="col-span-2">
                <FormField
                  control={signUpForm.control}
                  name="verificationDocuments"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Verification Documents</FormLabel>
                      <FormDescription className="pb-2">
                        Upload your verification documents, such as your medical
                        license and ID card.
                      </FormDescription>
                      <FormControl>
                        <DocumentsUploadDropzone
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && selectedRole === Role.PATIENT && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {currentStep === 1 && selectedRole === Role.HEALTHCARE_CENTER && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <div className="col-span-3">
                <FormField
                  control={signUpForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          disabled={isPending}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={signUpForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Postal Code"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3">
                <FormField
                  control={signUpForm.control}
                  name="verificationDocuments"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Verification Documents</FormLabel>
                      <FormDescription className="pb-2">
                        Upload your verification documents, such as your medical
                        license and ID card.
                      </FormDescription>
                      <FormControl>
                        <DocumentsUploadDropzone
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="•••••••••"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="•••••••••"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {currentStep === 3 && success && (
            <>
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="rounded-xl border border-green-200 bg-green-100 p-6"
              >
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircledIcon className="h-16 w-16 text-green-600" />
                  <h1 className="text-xl font-semibold">All Set!</h1>
                  <p className="text-center text-muted-foreground">{success}</p>
                </div>
              </motion.div>
            </>
          )}

          {isPending && (
            <div className="flex flex-col items-center space-y-4 pt-4">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Processing...</p>
            </div>
          )}

          {currentStep === 3 && error && (
            <div className="rounded-xl border bg-destructive/15 p-6">
              <div className="flex flex-col items-center space-y-2">
                <CrossCircledIcon className="h-16 w-16 text-red-600" />
                <h1 className="text-xl font-semibold">Oops!</h1>
                <p className="text-center text-sm text-muted-foreground">
                  {error}
                </p>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setError("");
                      setCurrentStep(0);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>

      {currentStep === 3 && success && (
        <div className="pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/auth/sign-in")}
            className="w-full"
          >
            Go to Sign In
          </Button>
        </div>
      )}

      {currentStep !== 3 && (
        <div className="pt-6">
          <Button
            type="button"
            variant="blue"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="w-full"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>

          <Button
            type="button"
            onClick={previous}
            disabled={currentStep === 0 || currentStep === steps.length - 1}
            variant="outline"
            className="mt-4 w-full"
          >
            Previous
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center space-y-4">
        <div className="mt-4 flex justify-center gap-x-1 text-sm text-muted-foreground">
          <p>{"Already have an account?"}</p>
          <Link
            href="/auth/sign-in"
            className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>

        <div className="flex items-center space-x-4 pt-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-white",
                index === currentStep ? "bg-blue-600" : "border bg-muted",
                error && index === currentStep && "bg-destructive",
                success && index === currentStep && "bg-green-600",
              )}
            >
              {error && index === currentStep && (
                <Cross2Icon className="h-3.5 w-3.5" />
              )}
              {success && index === currentStep && (
                <CheckIcon className="h-3.5 w-3.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
