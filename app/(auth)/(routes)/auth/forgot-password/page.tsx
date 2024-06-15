import React from "react";

import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPassword() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/40">
      <ForgotPasswordForm />
    </div>
  );
}
