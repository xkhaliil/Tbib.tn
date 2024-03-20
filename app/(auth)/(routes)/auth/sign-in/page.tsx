import React from "react";

import { SignInForm } from "@/components/forms/sign-in-form";

export default function SignIn() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-[800px_1fr]">
      <div className="flex flex-col items-center justify-center">
        <SignInForm />
      </div>
      <div className="hidden border-l bg-muted lg:flex"></div>
    </div>
  );
}
