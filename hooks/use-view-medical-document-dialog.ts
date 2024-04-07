import { Document } from "@prisma/client";
import { create } from "zustand";

interface ViewMedicalDocumentDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
  medicalDocument: Document | null;
  setMedicalDocument: (medicalDocument: Document) => void;
}

export const useViewMedicalDocumentDialog =
  create<ViewMedicalDocumentDialogState>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
    medicalDocument: null,
    setMedicalDocument: (medicalDocument) => set({ medicalDocument }),
  }));
