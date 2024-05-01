import { create } from "zustand";

interface UploadMedicalDocumentDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useUploadMedicalDocumentDialog =
  create<UploadMedicalDocumentDialogState>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }));
