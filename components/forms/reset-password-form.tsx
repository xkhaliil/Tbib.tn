"use client";

import React from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/password-reset";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Logo } from "@/components/marketing/logo";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const token = searchParams?.get("token");

  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isLoading, startTransition] = React.useTransition();

  const resetPasswordForm = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(data, token)
        .then((response) => {
          if (response.error) {
            setError(response.error);
            return;
          }

          if (response.success) {
            setSuccess(response.success);
          }
        })
        .catch(() => {
          setError("An error occurred. Please try again.");
        });
    });
  };
  return (
    <div className="flex w-full max-w-[450px] flex-col space-y-6">
      <div className="flex items-center justify-center">
        <Logo className="h-8 w-8" />
        <span className="ml-2 text-3xl font-bold tracking-tighter text-blue-600">
          Oladoc
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Form {...resetPasswordForm}>
              <form
                onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
                className="space-y-4"
                id="reset-password-form"
              >
                <FormField
                  control={resetPasswordForm.control}
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
                  control={resetPasswordForm.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  className="w-full"
                  onClick={resetPasswordForm.handleSubmit(onSubmit)}
                  disabled={isLoading || success !== ""}
                >
                  {isLoading ? <Spinner className="mr-2" /> : "Reset Password"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant="secondary"
            className="w-full"
            disabled={isLoading}
          >
            <Link href="/auth/sign-in">Back to sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
