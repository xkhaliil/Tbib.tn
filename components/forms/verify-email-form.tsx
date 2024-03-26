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
import { Logo } from "@/components/logo";

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
  const verificationToken = searchParams.get("token");

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
      <Logo />
      <Card>
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Please click the button below to verify your email.
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
          <Button asChild variant="secondary" className="w-full">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
