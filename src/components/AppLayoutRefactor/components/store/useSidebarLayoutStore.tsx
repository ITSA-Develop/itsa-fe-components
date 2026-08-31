import { getStoredCollapsedSidebar } from "@/helpers/functions";
import { create } from "zustand";



export interface SidebarLayoutStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useSidebarLayoutStore = create<SidebarLayoutStore>((set) => ({
  open: getStoredCollapsedSidebar(),
  setOpen: (open: boolean) => set({ open }),
}));