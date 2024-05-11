import { create } from "zustand";

interface ActiveListState {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

export const useActiveList = create<ActiveListState>((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((member) => member !== id),
    })),
  set: (ids) => set({ members: ids }),
}));
