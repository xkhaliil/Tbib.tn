import React from "react";

interface KeyboardShortcutProps {
  children: React.ReactNode;
}

export function KeyboardShortcut({ children }: KeyboardShortcutProps) {
  return (
    <div className="center flex h-5 w-fit min-w-[1.25rem] items-center justify-center rounded-md border border-foreground/20 px-1 text-xs font-medium text-foreground/50">
      {children}
    </div>
  );
}
