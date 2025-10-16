import { IAgency, IModule, ISubmodule } from '../interfaces';

export interface AppLayoutStore {
    agencies: IAgency[];
    setAgencies: (agencies: IAgency[]) => void;
    modulesAgency: IModule[];
    setModulesAgency: (modules: IModule[]) => void;
    submodulesAgency: ISubmodule[];
    setSubmodulesAgency: (submodules: ISubmodule[]) => void;
    currentAgency?: IAgency;
    setCurrentAgency: (agency: IAgency) => void;
    currentModule?: IModule;
    setCurrentModule: (module: IModule) => void;
    currentSubmodule?: ISubmodule;
    setCurrentSubmodule: (submodule: ISubmodule) => void;
    userName?: string;
    userRole?: string;
    setUserName: (userName: string) => void;
    setUserRole: (userRole: string) => void;
}
export declare const useAppLayoutStore: import('zustand').UseBoundStore<import('zustand').StoreApi<AppLayoutStore>>;
//# sourceMappingURL=appLayout.store.d.ts.map