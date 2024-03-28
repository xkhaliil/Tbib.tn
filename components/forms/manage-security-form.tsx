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

export function ManageSecurityForm() {
  const user = useCurrentUser();

  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isLoading, startTransition] = React.useTransition();

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
    <div className="flex flex-col gap-4">
      <Form {...manageSecurityForm}>
        <form
          onSubmit={manageSecurityForm.handleSubmit(onSubmit)}
          className="space-y-4"
          id="manage-security-form"
        >
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
                    disabled={isLoading}
                  />
                </FormControl>
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
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={manageSecurityForm.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel aria-disabled={isLoading}>
                  Two Factor Authentication
                </FormLabel>
                <FormItem
                  className={cn(
                    "flex flex-row items-center justify-between rounded-lg border p-3",
                    isLoading
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
                      disabled={isLoading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="delete-account">Delete Account</Label>
            <Card className="rounded-lg shadow-none">
              <CardHeader className="space-y-3">
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Permanently remove your Personal Account and all of its
                  contents from our platform. This action is not reversible, so
                  please continue with caution.
                </CardDescription>
              </CardHeader>

              <Separator />

              <CardFooter className="flex justify-end px-6 py-3">
                <Button variant="destructive" type="button" onClick={() => {}}>
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            className="flex items-center justify-center"
            onClick={manageSecurityForm.handleSubmit(onSubmit)}
            disabled={
              isLoading ||
              success !== "" ||
              !manageSecurityForm.formState.isDirty
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
