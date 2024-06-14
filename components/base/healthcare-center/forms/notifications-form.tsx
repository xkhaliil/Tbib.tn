"use client";

import React from "react";

import { settings } from "@/actions/settings";
import { ManageAccountSchema, ManageAccountSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function NotificationsForm() {
  const user = useCurrentUser();
  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const manageNotificationsForm = useForm<ManageAccountSchemaType>({
    resolver: zodResolver(ManageAccountSchema),
    defaultValues: {
      receiveEmailNotifications: user?.receiveEmailNotifications,
      receiveSmsNotifications: user?.receiveSmsNotifications,
    },
  });

  async function updateSession() {
    await update({
      ...session,
      user: {
        ...session?.user,
        receiveEmailNotifications:
          manageNotificationsForm.getValues().receiveEmailNotifications,
        receiveSmsNotifications:
          manageNotificationsForm.getValues().receiveSmsNotifications,
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage how you receive notifications from Oladoc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...manageNotificationsForm}>
          <form
            onSubmit={manageNotificationsForm.handleSubmit(onSubmit)}
            id="notifications-form"
            className="space-y-4"
          >
            <FormField
              control={manageNotificationsForm.control}
              name="receiveEmailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-blue-600 data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Receive email notifications</FormLabel>
                    <FormDescription>
                      Get notified by email when you your appointment is
                      cancelled or rescheduled.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={manageNotificationsForm.control}
              name="receiveSmsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-blue-600 data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Receive SMS notifications</FormLabel>
                    <FormDescription>
                      Get notified by SMS when your appointment is cancelled or
                      rescheduled.
                    </FormDescription>
                  </div>
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
          form="notifications-form"
          variant="blue"
          onClick={manageNotificationsForm.handleSubmit(onSubmit)}
          disabled={
            isPending ||
            success !== "" ||
            !manageNotificationsForm.formState.isDirty
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
