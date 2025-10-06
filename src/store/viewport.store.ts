import { create } from "zustand";

type ViewportState = {
  width: number;
  height: number;
  setSize: (size: { width: number; height: number }) => void;
};

export const useViewportStore = create<ViewportState>((set) => ({
  width: 0,
  height: 0,
  setSize: (size) => set(size),
}));
