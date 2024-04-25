"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/login";
import { SignInSchema, SignInSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSignInDialog } from "@/hooks/use-sign-in-dialog";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OTP } from "@/components/ui/otp";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/form-error";
import { FormInfo } from "@/components/form-info";
import { FormSuccess } from "@/components/form-success";
import { Logo } from "@/components/marketing/logo";

export function SignInDialog() {
  const router = useRouter();
  const signInDialog = useSignInDialog();
  const callbackUrl = usePathname();
  console.log("callbackUrl", callbackUrl);

  const [showTwoFactorAuth, setShowTwoFactorAuth] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [info, setInfo] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const signInForm = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      verificationCode: "",
    },
  });

  const onSubmit = (values: SignInSchemaType) => {
    setError("");
    setSuccess("");
    setInfo("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            signInForm.reset();
            setError(data.error);
          }

          if (data?.success) {
            signInForm.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactorAuth(true);
          }

          if (data?.info) {
            setInfo(data.info);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Dialog open={signInDialog.open} onOpenChange={signInDialog.setOpen}>
      <DialogContent>
        <Logo className="h-8 w-8" />
        <div className="flex flex-col space-y-1">
          <DialogTitle className="text-lg tracking-tight text-blue-600">
            {showTwoFactorAuth ? "Verify your account" : "Sign in"}
          </DialogTitle>
          {showTwoFactorAuth ? (
            <DialogDescription>
              We have sent a verification code to your email address.
            </DialogDescription>
          ) : (
            <DialogDescription>
              Sign in to access your account
            </DialogDescription>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(onSubmit)}
              className="space-y-4"
              id="sign-in-form"
            >
              {showTwoFactorAuth && (
                <FormField
                  control={signInForm.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem className="flex justify-center">
                      <FormControl>
                        <OTP value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!showTwoFactorAuth && (
                <>
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signInForm.control}
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
                        <Button
                          asChild
                          variant="link"
                          size="sm"
                          className="px-0"
                        >
                          <Link href="/auth/forgot-password">
                            Forgot password?
                          </Link>
                        </Button>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormError message={error} />
              <FormSuccess message={success} />
              <FormInfo message={info} />

              <Button
                type="submit"
                className="w-full"
                variant="blue"
                onClick={signInForm.handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? <Spinner className="mr-2" /> : null}
                {showTwoFactorAuth ? "Confirm" : "Sign In"}
              </Button>

              {showTwoFactorAuth && (
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => router.push("/auth/sign-in")}
                >
                  Back to sign in
                </Button>
              )}
            </form>
          </Form>
        </div>

        {!showTwoFactorAuth && (
          <>
            <div className="mt-4 flex justify-start gap-x-1 text-sm text-muted-foreground">
              <p>{"New to Oladoc?"}</p>
              <Link
                href="/auth/sign-up"
                className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
