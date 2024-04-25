import { create } from "zustand";

interface SignInDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useSignInDialog = create<SignInDialogState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
