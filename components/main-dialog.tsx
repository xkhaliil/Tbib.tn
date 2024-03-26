"use client";

import React from "react";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

interface MainDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export function MainDialog({ open, setOpen, children }: MainDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl">
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
