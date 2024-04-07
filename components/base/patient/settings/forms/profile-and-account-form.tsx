"use client";

import React from "react";

import { settings } from "@/actions/settings";
import { ManageAccountSchema, ManageAccountSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO, startOfToday } from "date-fns";
import { AlertTriangleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { userHasCompletedProfile } from "@/lib/auth/helpers";
import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GenderCard } from "@/components/base/patient/settings/gender-card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UploadButton } from "@/components/upload-button";

enum GENDERS {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export function ProfileAndAccountForm() {
  const user = useCurrentUser();
  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const manageAccountAndProfileForm = useForm<ManageAccountSchemaType>({
    resolver: zodResolver(ManageAccountSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth ? parseISO(user.dateOfBirth) : undefined,
      phone: user?.phone || "",
      gender: (user?.gender as GENDERS) || "",
      image: user?.image || "",
      bio: user?.bio || "",
      state: user?.state || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
    },
  });

  async function updateSession() {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: manageAccountAndProfileForm.getValues("name"),
        email: manageAccountAndProfileForm.getValues("email"),
        image: manageAccountAndProfileForm.getValues("image"),
        bio: manageAccountAndProfileForm.getValues("bio"),
      },
    });
  }

  const onSubmit: SubmitHandler<ManageAccountSchemaType> = async (data) => {
    startTransition(() => {
      settings(data)
        .then((response) => {
          if (response.error) {
            setError(response.error);
            return;
          }

          if (response.success) {
            setSuccess(response.success);
            updateSession();
          }
        })
        .catch(() => {
          setError("Something went wrong. Please try again.");
        });
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile & Account</CardTitle>
          <CardDescription>
            Manage your profile and account settings.
          </CardDescription>
        </div>

        {!userHasCompletedProfile(user) && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="warning"
                  size="icon"
                  className="rounded-full"
                  aria-label="Help"
                >
                  <AlertTriangleIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={2}
                align="end"
                side="bottom"
                className="w-64 border border-yellow-500 bg-yellow-50 text-yellow-500"
              >
                You haven't completed your profile yet. Please complete your
                profile in order to book an appointment.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        <Form {...manageAccountAndProfileForm}>
          <form
            id="manage-profile-and-account-form"
            onSubmit={manageAccountAndProfileForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-6">
              <Avatar className="h-[5.5rem] w-[5.5rem]">
                <AvatarImage
                  src={
                    user?.image ||
                    manageAccountAndProfileForm.getValues("image") ||
                    ""
                  }
                  alt={user?.name || undefined}
                />
                <AvatarFallback>
                  <span className="text-3xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>

              <div>
                <FormLabel>Profile Picture</FormLabel>
                <FormDescription className="mb-2">
                  A profile picture is optional but strongly recommended.
                </FormDescription>
                <FormField
                  control={manageAccountAndProfileForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <UploadButton
                          value={field.value as string}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormField
                control={manageAccountAndProfileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Your name is visible to other users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={manageAccountAndProfileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>
                      Your email address cannot be changed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <FormField
                control={manageAccountAndProfileForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="mt-1 flex flex-col">
                    <FormLabel>Date Of Birth</FormLabel>
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
                              format(field.value, "MMMM dd, yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[315px] p-0" align="start">
                        <Calendar
                          selectedDay={field.value as Date}
                          setSelectedDay={field.onChange}
                          disabledDates={(date) => {
                            return date > startOfToday();
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is not visible to other users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={manageAccountAndProfileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-input">
                        <span className="flex select-none items-center px-3 text-muted-foreground sm:text-sm">
                          (+216)
                        </span>
                        <Input
                          placeholder="Phone Number"
                          {...field}
                          disabled={isPending}
                          className="block w-full flex-1 rounded-none rounded-r-md shadow-none sm:text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Your phone number is not visible to other users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={manageAccountAndProfileForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Gender</FormLabel>
                    <FormMessage />
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                    >
                      <FormItem>
                        <FormLabel className="ring-blue-600 ring-offset-2 ring-offset-blue-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem value="MALE" className="sr-only" />
                          </FormControl>
                          <GenderCard
                            title="Male"
                            checked={field.value === "MALE"}
                          />
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                        <FormLabel className="ring-blue-600 ring-offset-2 ring-offset-blue-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              value="FEMALE"
                              className="sr-only"
                            />
                          </FormControl>
                          <GenderCard
                            title="Female"
                            checked={field.value === "FEMALE"}
                          />
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormDescription>
                      Your gender will only be visible to your practitioners.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <FormField
                control={manageAccountAndProfileForm.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="State"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={manageAccountAndProfileForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={manageAccountAndProfileForm.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Postal Code"
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
              control={manageAccountAndProfileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bio"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    A short bio about yourself. This is visible to other users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          type="submit"
          form="manage-profile-and-account-form"
          variant="blue"
          onClick={manageAccountAndProfileForm.handleSubmit(onSubmit)}
          disabled={
            isPending ||
            success !== "" ||
            !manageAccountAndProfileForm.formState.isDirty
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
      </CardFooter>
    </Card>
  );
}
