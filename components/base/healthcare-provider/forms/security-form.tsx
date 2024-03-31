"use client";

import React from "react";

import { settings } from "@/actions/settings";
import { ManageAccountSchema, ManageAccountSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function SecurityForm() {
  const user = useCurrentUser();

  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const manageSecurityForm = useForm<ManageAccountSchemaType>({
    resolver: zodResolver(ManageAccountSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    },
  });

  async function updateSession() {
    await update({
      ...session,
      user: {
        ...session?.user,
        isTwoFactorEnabled: manageSecurityForm.getValues().isTwoFactorEnabled,
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
    <div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Password & Security
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your password and security settings
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="white"
            onClick={() => manageSecurityForm.reset()}
            disabled={isPending || !manageSecurityForm.formState.isDirty}
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            type="submit"
            form="manage-profile-form"
            className="flex items-center justify-center"
            onClick={manageSecurityForm.handleSubmit(onSubmit)}
            disabled={
              isPending ||
              success !== "" ||
              !manageSecurityForm.formState.isDirty
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

      <Form {...manageSecurityForm}>
        <form
          onSubmit={manageSecurityForm.handleSubmit(onSubmit)}
          id="manage-security-form"
          className="grid grid-cols-1 gap-6 sm:grid-cols-6"
        >
          <div className="sm:col-span-6">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <div>
            <div className="sm:col-span-3">
              <FormField
                control={manageSecurityForm.control}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sm:col-span-3">
              <FormField
                control={manageSecurityForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="•••••••••"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sm:col-span-6">
              <FormField
                control={manageSecurityForm.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel aria-disabled={isPending}>
                      Two Factor Authentication
                    </FormLabel>
                    <FormItem
                      className={cn(
                        "flex flex-row items-center justify-between rounded-lg border p-3",
                        isPending
                          ? "cursor-not-allowed opacity-50"
                          : "bg-background",
                      )}
                    >
                      <div className="space-y-1">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for added security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <div className="space-y-2">
              <Label htmlFor="delete-account">Delete Account</Label>
              <Card className="rounded-lg shadow-none">
                <CardHeader className="space-y-3">
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>
                    Permanently remove your Personal Account and all of its
                    contents from our platform. This action is not reversible,
                    so please continue with caution.
                  </CardDescription>
                </CardHeader>

                <Separator />

                <CardFooter className="flex justify-end px-6 py-3">
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => {}}
                  >
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
