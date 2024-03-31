import { create } from "zustand";

interface InviteHealthcareProviderDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useInviteHealthcareProviderDialog =
  create<InviteHealthcareProviderDialogState>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }));
