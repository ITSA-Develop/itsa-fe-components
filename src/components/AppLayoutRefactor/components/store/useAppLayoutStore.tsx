import { IPermission } from "@/interfaces";
import { create } from "zustand";

export interface AppLayoutStore {
  permissions?: IPermission;
}

export const useAppLayoutStore = create<AppLayoutStore>((set) => ({
  permissions: undefined,
  setPermissions: (permissions: IPermission) => set({ permissions }),
}));