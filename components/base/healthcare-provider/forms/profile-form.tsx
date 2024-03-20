"use client";

import React from "react";

import { settings } from "@/actions/healthcare-provider";
import { languages, specialties } from "@/constants";
import {
  ManageHealthcareProviderProfileSchema,
  ManageHealthcareProviderProfileSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UploadButton } from "@/components/upload-button";

import { VerifiedAccountBadge } from "../verified-account-badge";

export function ProfileForm() {
  const user = useCurrentUser();
  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const manageProfileForm = useForm<ManageHealthcareProviderProfileSchemaType>({
    resolver: zodResolver(ManageHealthcareProviderProfileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      image: user?.image || "",
      bio: user?.bio || "",
      speciality: user?.speciality || "",
      spokenLanguages: user?.spokenLanguages || [],
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
        name: manageProfileForm.getValues("name"),
        phone: manageProfileForm.getValues("phone"),
        email: manageProfileForm.getValues("email"),
        image: manageProfileForm.getValues("image"),
        bio: manageProfileForm.getValues("bio"),
        speciality: manageProfileForm.getValues("speciality"),
        spokenLanguages: manageProfileForm.getValues("spokenLanguages"),
        state: manageProfileForm.getValues("state"),
        city: manageProfileForm.getValues("city"),
        postalCode: manageProfileForm.getValues("postalCode"),
      },
    });
  }

  const onSubmit: SubmitHandler<
    ManageHealthcareProviderProfileSchemaType
  > = async (data) => {
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
    <div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-sm text-muted-foreground">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="white"
            onClick={() => manageProfileForm.reset()}
            disabled={isPending || !manageProfileForm.formState.isDirty}
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            type="submit"
            form="manage-profile-form"
            className="flex items-center justify-center"
            onClick={manageProfileForm.handleSubmit(onSubmit)}
            disabled={
              isPending ||
              success !== "" ||
              !manageProfileForm.formState.isDirty
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

      <Form {...manageProfileForm}>
        <form
          onSubmit={manageProfileForm.handleSubmit(onSubmit)}
          id="manage-profile-form"
          className="grid grid-cols-1 gap-6 sm:grid-cols-6"
        >
          <div className="sm:col-span-6">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <div className="rounded-lg border p-6 sm:col-span-6">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative h-20 w-20">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={
                        user?.image ||
                        manageProfileForm.getValues("image") ||
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

                  {user?.accountVerified && <VerifiedAccountBadge />}
                </div>
                <div className="flex flex-col space-y-0.5">
                  <h3 className="text-base font-semibold">
                    {user?.name || manageProfileForm.getValues("name") || ""}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.speciality || ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <FormField
                control={manageProfileForm.control}
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

          <div className="sm:col-span-3">
            <FormField
              control={manageProfileForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-3">
            <FormField
              control={manageProfileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-6">
            <FormField
              control={manageProfileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      {...field}
                      disabled={isPending}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-3">
            <FormField
              control={manageProfileForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-input">
                      <span className="flex select-none items-center px-3 text-muted-foreground sm:text-sm">
                        (+216)
                      </span>
                      <Input
                        placeholder="Phone"
                        {...field}
                        disabled={isPending}
                        className="block w-full flex-1 rounded-none rounded-r-md shadow-none sm:text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-3">
            <FormField
              control={manageProfileForm.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled
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
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={manageProfileForm.control}
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
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={manageProfileForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={manageProfileForm.control}
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

          <div className="sm:col-span-2">
            <FormField
              control={manageProfileForm.control}
              name="spokenLanguages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spoken Languages</FormLabel>
                  <FormControl>
                    <MultiSelect
                      selected={field.value!}
                      options={languages}
                      {...field}
                      placeholder="Select languages"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
