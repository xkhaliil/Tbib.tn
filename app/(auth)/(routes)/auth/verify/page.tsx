import React from "react";

import { VerifyEmailForm } from "@/components/forms/verify-email-form";
import { Logo } from "@/components/marketing/logo";

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
