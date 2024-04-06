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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function PasswordAndSecurityFormAdmin() {
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
    <Card>
      <CardHeader>
        <CardTitle>Password & Security</CardTitle>
        <CardDescription>
          Update your password and manage your security settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...manageSecurityForm}>
          <form
            onSubmit={manageSecurityForm.handleSubmit(onSubmit)}
            id="password-and-security-form"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    <FormDescription>
                      Enter your current password to make changes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>
                      Password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormError message={error} />
            <FormSuccess message={success} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          type="submit"
          form="password-and-security-form"
          variant="blue"
          onClick={manageSecurityForm.handleSubmit(onSubmit)}
          disabled={
            isPending || success !== "" || !manageSecurityForm.formState.isDirty
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
