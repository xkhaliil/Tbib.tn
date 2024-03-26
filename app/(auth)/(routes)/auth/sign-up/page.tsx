import { SignUpForm } from "@/components/forms/sign-up-form";
import { Logo } from "@/components/marketing/logo";

export default function SignUp() {
  return (
    <div className="grid h-screen grid-cols-1 xl:grid-cols-[550px_1fr]">
      <div className="relative hidden h-full flex-col border-r bg-muted p-10 text-foreground xl:flex">
        <div className="absolute inset-0 bg-muted" />
        <div className="relative z-20 flex items-center">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Oladoc has transformed how I approach healthcare. Booking
              appointments is incredibly easy, and the app's reminders keep me
              on track. It's a game-changer for anyone looking for a hassle-free
              way to manage their health appointments.
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  );
}
