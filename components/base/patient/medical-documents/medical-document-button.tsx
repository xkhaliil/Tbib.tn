"use client";

import React from "react";

import { deleteDocument } from "@/actions/patient";
import { Document } from "@prisma/client";
import { toast } from "sonner";

import { useViewMedicalDocumentDialog } from "@/hooks/use-view-medical-document-dialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewMedicalDocumentDialog } from "@/components/base/patient/medical-documents/dialogs/view-medical-document-dialog";

enum ButtonType {
  VIEW,
  DOWNLOAD,
  DELETE,
}

interface MedicalDocumentButtonProps {
  label: string;
  icon: React.ElementType;
  variant: "blue" | "outline" | "destructive";
  buttonType: ButtonType;
  medicalDocument: Document;
}

export function MedicalDocumentButton({
  label,
  icon: Icon,
  variant,
  buttonType,
  medicalDocument,
}: MedicalDocumentButtonProps) {
  const viewMedicalDocumentDialog = useViewMedicalDocumentDialog();
  const [isPending, startTransition] = React.useTransition();

  async function handleButtonClick(type: ButtonType) {
    startTransition(() => {
      switch (type) {
        case ButtonType.VIEW:
          viewMedicalDocumentDialog.setMedicalDocument(medicalDocument);
          viewMedicalDocumentDialog.setOpen(true);
          break;
        case ButtonType.DOWNLOAD:
          window.open(medicalDocument.url, "_blank");
          break;
        case ButtonType.DELETE:
          deleteDocument(medicalDocument.id)
            .then((response) => {
              if (response?.success) {
                toast.success(response.success);
              }
            })
            .catch((error) => {
              console.error(error);
              toast.error("Failed to delete document");
            });
          break;
        default:
          break;
      }
    });
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size="icon"
              onClick={() => handleButtonClick(buttonType)}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : <Icon className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center" className="mr-8">
            <span>{label}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ViewMedicalDocumentDialog />
    </>
  );
}
