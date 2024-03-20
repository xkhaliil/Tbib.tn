"use client";

import { DashIcon } from "@radix-ui/react-icons";
import { OTPInput } from "input-otp";

import { cn } from "@/lib/utils";

interface OTPProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export function OTP({ value, onChange }: OTPProps) {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      maxLength={6}
      containerClassName="group flex items-center has-[:disabled]:opacity-30"
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, 3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>

          <FakeDash />

          <div className="flex">
            {slots.slice(3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        </>
      )}
    />
  );
}

// Feel free to copy. Uses @shadcn/ui tailwind colors.
function Slot(props: { char: string | null; isActive: boolean }) {
  return (
    <div
      className={cn(
        "relative mb-4 h-20 w-[4.8rem] text-[2rem] font-semibold",
        "flex items-center justify-center",
        "border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md",
        "group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-2 outline-accent-foreground/50": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.char === null && props.isActive && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-12 w-px animate-caret-blink bg-foreground duration-1000" />
    </div>
  );
}

function FakeDash() {
  return (
    <div className="flex w-10 items-center justify-center" role="separator">
      <div className="mb-4 h-1 w-3 rounded-full bg-border" />
    </div>
  );
}
