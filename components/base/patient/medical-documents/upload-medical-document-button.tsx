"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { useUploadMedicalDocumentDialog } from "@/hooks/use-upload-medical-document-dialog";

import { Button } from "@/components/ui/button";

interface UploadMedicalDocumentButtonProps {
  className?: string;
}

export function UploadMedicalDocumentButton({
  className,
}: UploadMedicalDocumentButtonProps) {
  const uploadMedicalDocumentDialog = useUploadMedicalDocumentDialog();
  return (
    <Button
      variant="blue"
      className={cn(className)}
      onClick={() => uploadMedicalDocumentDialog.setOpen(true)}
    >
      Upload a document
    </Button>
  );
}
