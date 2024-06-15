import type { Metadata } from "next";
import Link from "next/link";
import { getLatestPatients } from "@/actions/patient";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "@/components/forms/sign-up-form";
import { Logo } from "@/components/marketing/logo";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp() {
  const latestPatients = await getLatestPatients();
  return (
    <div className="grid h-screen grid-cols-1 xl:grid-cols-[550px_1fr]">
      <div className="relative hidden h-full flex-col items-center justify-center border-r bg-muted p-10 text-foreground xl:flex">
        <div className="absolute inset-0 bg-blue-50" />
        <div className="relative z-20">
          <div className="space-y-4">
            <Link className="flex items-center" href="/">
              <Logo className="h-9 w-9" />
              <span className="ml-2 text-3xl font-bold tracking-tighter text-blue-600">
                Oladoc
              </span>
            </Link>

            <h1 className="text-5xl font-bold tracking-tighter">
              Book appointments with ease.
            </h1>
            <p className="text-md font-light text-muted-foreground">
              Millions of patients use Oladoc to find and book care online. Find
              a doctor, read reviews, and book an appointment today.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {latestPatients?.map((patient) => (
                  <Avatar
                    key={patient.id}
                    className="h-10 w-10 border-2 border-white"
                  >
                    <AvatarImage
                      src={patient.user.image || "/placeholder.svg"}
                      alt={patient.user.name}
                    />
                    <AvatarFallback>{patient.user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>

              <Separator orientation="vertical" className="h-10" />

              <p className="text-sm font-light text-muted-foreground">
                Sign up to book appointments with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  );
}
