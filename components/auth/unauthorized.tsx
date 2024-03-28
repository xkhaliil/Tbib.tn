import React from "react";

export function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="p-2 text-center sm:p-5 sm:pb-0">
        <div className="mx-auto max-w-md space-y-4">
          <h1 className="text-[6rem] font-semibold leading-none text-blue-600">
            401
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Unauthorized
          </h2>
          <p className="text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    </div>
  );
}
