"use client";

import React from "react";

import { settings } from "@/actions/healthcare-provider";
import {
  ManageHealthcareProviderProfileSchema,
  ManageHealthcareProviderProfileSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function NotificationsForm() {
  const user = useCurrentUser();
  const { data: session, update } = useSession();

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const manageNotificationsForm =
    useForm<ManageHealthcareProviderProfileSchemaType>({
      resolver: zodResolver(ManageHealthcareProviderProfileSchema),
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
    <>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Manage your email and SMS notifications
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="white"
            onClick={() => manageNotificationsForm.reset()}
            disabled={isPending || !manageNotificationsForm.formState.isDirty}
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            type="submit"
            form="manage-notifications-form"
            className="flex items-center justify-center"
            onClick={manageNotificationsForm.handleSubmit(onSubmit)}
            disabled={isPending || !manageNotificationsForm.formState.isDirty}
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

      <Form {...manageNotificationsForm}>
        <form
          onSubmit={manageNotificationsForm.handleSubmit(onSubmit)}
          id="manage-notifications-form"
          className="grid w-full grid-cols-1 gap-6"
        >
          <div className="w-full">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>

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
                    Get notified by email when you receive a new message or
                    appointment request
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
                    Get notified by SMS when you receive a new message or
                    appointment request
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
