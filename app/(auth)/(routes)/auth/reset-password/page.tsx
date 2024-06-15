import React from "react";

import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/40">
      <ResetPasswordForm />
    </div>
  );
}
