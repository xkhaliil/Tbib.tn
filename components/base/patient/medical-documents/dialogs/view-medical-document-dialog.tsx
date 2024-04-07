"use client";

import React from "react";

import Image from "next/image";

import { useViewMedicalDocumentDialog } from "@/hooks/use-view-medical-document-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ViewMedicalDocumentDialog() {
  const { open, setOpen, medicalDocument } = useViewMedicalDocumentDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{medicalDocument?.name}</DialogTitle>
          <DialogDescription>
            {medicalDocument?.description || "N/A"}
          </DialogDescription>
        </DialogHeader>

        {/* <div className="flex items-center justify-center">
          <Image
            src={medicalDocument?.url || ""}
            alt={medicalDocument?.name || ""}
            width={500}
            height={500}
            className="w-full rounded-xl object-cover"
          />
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
