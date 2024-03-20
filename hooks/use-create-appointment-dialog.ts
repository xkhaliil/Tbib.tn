import { create } from "zustand";

interface CreateAppointmentDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCreateAppointmentDialog = create<CreateAppointmentDialogState>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }),
);
