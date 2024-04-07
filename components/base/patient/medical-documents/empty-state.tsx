"use client";

import React from "react";

import { FolderOpenIcon } from "lucide-react";

import { useUploadMedicalDocumentDialog } from "@/hooks/use-upload-medical-document-dialog";

import { Button } from "@/components/ui/button";

import { UploadMedicalDocumentButton } from "./upload-medical-document-button";

export function EmptyState() {
  const uploadMedicalDocumentDialog = useUploadMedicalDocumentDialog();
  return (
    <div className="flex h-[710px] flex-1 items-center justify-center rounded-lg border border-dashed">
      <div className="flex w-full max-w-xl flex-col items-center gap-2.5 text-center">
        <FolderOpenIcon className="h-16 w-16 text-blue-400" />
        <h3 className="text-2xl font-bold tracking-tight">
          No medical documents yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload and manage your medical documents in one place to keep track of
          your health history and share them with your doctor when needed.
        </p>
        <UploadMedicalDocumentButton className="mt-4" />
      </div>
    </div>
  );
}
