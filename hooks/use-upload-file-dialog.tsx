import { create } from "zustand";

interface UploadFileDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useUploadFileDialog = create<UploadFileDialogState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
