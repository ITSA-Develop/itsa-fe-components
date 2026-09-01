import { IAgency, IModule, IPermissions, ISubAgency, ISubmodule } from "@/interfaces";
import { DefaultOptionType } from "antd/es/select";
import { create } from "zustand";

export interface AppLayoutStore {
  permissions?: IPermissions;
  setPermissions: (permissions: IPermissions) => void;
  
  agency?: IAgency;
  setAgency: (agency: IAgency) => void;
  
  subAgency?: ISubAgency;
  setSubAgency: (subAgency: ISubAgency) => void;
  
  module?: IModule;
  setModule: (module?: IModule) => void;

  submodule?: ISubmodule;
  setSubmodule: (submodule?: ISubmodule) => void;

  currentSubmodule?: ISubmodule;
  setCurrentSubmodule: (currentSubmodule?: ISubmodule) => void;

  currentCompany?: DefaultOptionType;
  setCurrentCompany: (currentCompany: DefaultOptionType) => void;

}

export const useAppLayoutStore = create<AppLayoutStore>((set) => ({
  permissions: undefined,
  setPermissions: (permissions: IPermissions) => set({ permissions }),
  agency: undefined,
  setAgency: (agency: IAgency) => set({ agency }),
  subAgency: undefined,
  setSubAgency: (subAgency: ISubAgency) => set({ subAgency }),
  module: undefined,
  setModule: (module?: IModule) => set({ module }),
  submodule: undefined,
  setSubmodule: (submodule?: ISubmodule) => set({ submodule }),
  currentSubmodule: undefined,
  setCurrentSubmodule: (currentSubmodule?: ISubmodule) => set({ currentSubmodule }),

  currentCompany: undefined,
  setCurrentCompany: (currentCompany: DefaultOptionType) => set({ currentCompany }),

}));
