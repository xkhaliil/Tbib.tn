"use client";

import React from "react";

import { settings } from "@/actions/settings";
import { ManageAccountSchema, ManageAccountSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UploadButton } from "@/components/upload-button";

export function ManageAccountForm() {
  const user = useCurrentUser();
  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isLoading, startTransition] = React.useTransition();

  const manageAccountForm = useForm<ManageAccountSchemaType>({
    resolver: zodResolver(ManageAccountSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
      bio: user?.bio || "",
    },
  });

  async function updateSession() {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: manageAccountForm.getValues("name"),
        email: manageAccountForm.getValues("email"),
        image: manageAccountForm.getValues("image"),
        bio: manageAccountForm.getValues("bio"),
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
    <div className="flex flex-col gap-4">
      <Form {...manageAccountForm}>
        <form
          onSubmit={manageAccountForm.handleSubmit(onSubmit)}
          className="space-y-4"
          id="manage-account-form"
        >
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user?.image || manageAccountForm.getValues("image") || ""}
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
              <FormDescription>
                A profile picture is optional but strongly recommended.
              </FormDescription>
              <FormField
                control={manageAccountForm.control}
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

          <FormField
            control={manageAccountForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {user?.isOAuth && (
            <FormItem>
              <FormLabel>Connected Accounts</FormLabel>
              <Select disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={user.email} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={user?.email as string} disabled>
                    {user?.email}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}

          {!user?.isOAuth && (
            <>
              <FormField
                control={manageAccountForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={manageAccountForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A short bio about yourself"
                    {...field}
                    rows={3}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            className="flex items-center justify-center"
            onClick={manageAccountForm.handleSubmit(onSubmit)}
            disabled={
              isLoading ||
              success !== "" ||
              !manageAccountForm.formState.isDirty
            }
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
