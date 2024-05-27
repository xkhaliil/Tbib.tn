"use client";

import React from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/verification-token";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dots } from "@/components/ui/dots";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { Logo } from "../marketing/logo";

interface VerifyEmailFormProps {
  backButtonLabel: string;
  backButtonHref: string;
}

export function VerifyEmailForm({
  backButtonLabel,
  backButtonHref,
}: VerifyEmailFormProps) {
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [error, setError] = React.useState<string | undefined>("");

  const searchParams = useSearchParams();
  const verificationToken = searchParams?.get("token");

  const onSubmit = React.useCallback(() => {
    if (success || error) return;

    if (!verificationToken) {
      setError("Missing verification token.");
      return;
    }

    newVerification(verificationToken)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong.");
      });
  }, [verificationToken]);

  React.useEffect(() => {
    onSubmit();
  }, [onSubmit]);

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
          <CardTitle>Verifying your email</CardTitle>
          <CardDescription>
            We are verifying your email address. Please wait a moment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-center">
            {!success && !error && <Dots className="h-10 w-10" />}
            {!success && <FormError message={error} />}
            <FormSuccess message={success} />
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
