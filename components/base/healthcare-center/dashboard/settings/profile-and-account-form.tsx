"use client";

import React from "react";

import { settings } from "@/actions/settings";
import { ManageAccountSchema, ManageAccountSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO, startOfToday } from "date-fns";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

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
import { GenderCard } from "@/components/base/patient/settings/gender-card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UploadButton } from "@/components/upload-button";

enum GENDERS {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export default function ProfileAndAccountFormHc() {
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
      phone: user?.phone || "",
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
      <CardHeader>
        <CardTitle>Profile & Account</CardTitle>
        <CardDescription>
          Manage your profile and account settings.
        </CardDescription>
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
                        defaultValue={user?.name || ""}
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
                        defaultValue={user?.email || ""}
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
