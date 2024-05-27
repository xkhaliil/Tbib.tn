"use client";

import React from "react";

import Link from "next/link";
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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

export function ForgotPasswordForm() {
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const forgotPasswordForm = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchemaType> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/auth/forgot-password", data)
      .then(() => {
        setSuccess("Reset password email sent.");
        setError("");
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Form {...forgotPasswordForm}>
              <form
                onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
                className="space-y-4"
                id="forgot-password-form"
              >
                <FormField
                  control={forgotPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
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
                  variant="blue"
                  className="w-full"
                  onClick={forgotPasswordForm.handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner className="mr-2" /> : "Send Email"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/auth/sign-in">Back to sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
