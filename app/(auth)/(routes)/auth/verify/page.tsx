import React from "react";

import type { Metadata } from "next";

import { VerifyEmailForm } from "@/components/forms/verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function Verify() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/40">
      <VerifyEmailForm
        backButtonHref="/auth/sign-in"
        backButtonLabel="Back to Sign In"
      />
    </div>
  );
}
