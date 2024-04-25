import { create } from "zustand";

interface HealthcareProviderLocationState {
  state: string;
  address: string;
  latitude: number;
  longitude: number;
  setState: (state: string) => void;
  setAddress: (address: string) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

export const useHealthcareProviderLocation =
  create<HealthcareProviderLocationState>((set) => ({
    state: "",
    address: "",
    latitude: 0,
    longitude: 0,
    setState: (state) => set({ state }),
    setAddress: (address) => set({ address }),
    setLatitude: (latitude) => set({ latitude }),
    setLongitude: (longitude) => set({ longitude }),
  }));
