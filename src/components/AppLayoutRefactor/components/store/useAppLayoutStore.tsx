import { IAgency, IModule, IPermissions, ISubAgency, ISubmodule } from "@/interfaces";
import { DefaultOptionType } from "antd/es/select";
import { create } from "zustand";

export interface AppLayoutStore {
  permissions?: IPermissions;
  agencies?: IAgency[];
  setAgencies: (agencies: IAgency[]) => void;
  subAgencies?: ISubAgency[];
  setSubAgencies: (subAgencies: ISubAgency[]) => void;
  modules?: IModule[];
  setModules: (modules: IModule[]) => void;
  submodules?: ISubmodule[];
  setSubmodules: (submodules: ISubmodule[]) => void;
  currentSubmodule?: ISubmodule;
  setCurrentSubmodule: (currentSubmodule: ISubmodule) => void;

  currentCompany?: DefaultOptionType;
  setCurrentCompany: (currentCompany: DefaultOptionType) => void;
}

export const useAppLayoutStore = create<AppLayoutStore>((set) => ({
  permissions: undefined,
  setPermissions: (permissions: IPermissions) => set({ permissions }),
  agencies: [],
  setAgencies: (agencies: IAgency[]) => set({ agencies }),
  subAgencies: [],
  setSubAgencies: (subAgencies: ISubAgency[]) => set({ subAgencies }),
  modules: [],
  setModules: (modules: IModule[]) => set({ modules }),
  submodules: [],
  setSubmodules: (submodules: ISubmodule[]) => set({ submodules }),
  currentSubmodule: undefined,
  setCurrentSubmodule: (currentSubmodule: ISubmodule) => set({ currentSubmodule }),

  currentCompany: undefined,
  setCurrentCompany: (currentCompany: DefaultOptionType) => set({ currentCompany }),

}));