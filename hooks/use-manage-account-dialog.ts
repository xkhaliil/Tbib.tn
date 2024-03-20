import { create } from "zustand";

interface ManageAccountDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useManageAccountDialog = create<ManageAccountDialogState>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }),
);
