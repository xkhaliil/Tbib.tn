"use client";

import React from "react";

import { Document } from "@prisma/client";
import { format, formatDistance } from "date-fns";
import { DownloadIcon, EyeIcon, FileIcon, TrashIcon } from "lucide-react";

import { MedicalDocumentButton } from "@/components/base/patient/medical-documents/medical-document-button";

enum ButtonType {
  DOWNLOAD,
  DELETE,
}

interface MedicalDocumentCardProps {
  medicalDocument: Document;
}

export function MedicalDocumentCard({
  medicalDocument,
}: MedicalDocumentCardProps) {
  return (
    <div className="flex w-full flex-col rounded-xl border bg-white p-5 shadow-sm xl:flex-row">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border">
          <FileIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-md font-semibold">{medicalDocument.name}</h1>
            <p className="max-w-[18rem] truncate text-sm text-muted-foreground">
              {medicalDocument.description || "No description"}
            </p>
            <span className="mt-0.5 text-xs text-muted-foreground">
              Uploaded on{" "}
              {format(new Date(medicalDocument.createdAt), "MMM dd, yyyy")} (
              {formatDistance(new Date(medicalDocument.createdAt), new Date())}{" "}
              ago)
            </span>
          </div>

          <div className="ml-auto hidden items-center space-x-4 xl:flex">
            <MedicalDocumentButton
              label="Download"
              icon={DownloadIcon}
              variant="outline"
              buttonType={ButtonType.DOWNLOAD}
              medicalDocument={medicalDocument}
            />
            <MedicalDocumentButton
              label="Delete"
              icon={TrashIcon}
              variant="destructive"
              buttonType={ButtonType.DELETE}
              medicalDocument={medicalDocument}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 xl:hidden">
        <MedicalDocumentButton
          label="Download"
          icon={DownloadIcon}
          variant="outline"
          buttonType={ButtonType.DOWNLOAD}
          medicalDocument={medicalDocument}
        />
        <MedicalDocumentButton
          label="Delete"
          icon={TrashIcon}
          variant="destructive"
          buttonType={ButtonType.DELETE}
          medicalDocument={medicalDocument}
        />
      </div>
    </div>
  );
}
