import { ELocalStorageKeys } from '@/enums';
import { IAgency, IModule, ISubmodule, IUserInformation, IUserRole } from '@/interfaces';
import { create } from 'zustand';

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
	setUserName: (userName: string) => void;
	userRole?: IUserRole;
	setUserRole: (userRole: IUserRole) => void;

	userInformation?: IUserInformation;
	setUserInformation: (userInformation: IUserInformation) => void;

	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
}

export const useAppLayoutStore = create<AppLayoutStore>(set => ({
	collapsed: false,
	setCollapsed: (collapsed: boolean) => set({ collapsed }),
	agencies: [],
	setAgencies: (agencies: IAgency[]) => {
		set({ agencies });
	},
	modulesAgency: [],
	setModulesAgency: (modules: IModule[]) => {
		set({ modulesAgency: modules });
	},
	submodulesAgency: [],
	setSubmodulesAgency: (submodules: ISubmodule[]) => {
		set({ submodulesAgency: submodules });
	},
	currentAgency: undefined,
	setCurrentAgency: (agency: IAgency) => {
		set({
			currentAgency: agency,
		});
	},
	currentModule: undefined,
	setCurrentModule: (module: IModule) => {
		localStorage.setItem(ELocalStorageKeys.moduleHomeSelectedId, String(module.id));
		localStorage.setItem(ELocalStorageKeys.moduleId, String(module.id));
		const newSubmodule = module?.submodules?.[0];
		set({
			currentModule: module,
			submodulesAgency: module?.submodules ?? [],
			currentSubmodule: newSubmodule,
		});
	},
	currentSubmodule: undefined,
	setCurrentSubmodule: (submodule: ISubmodule) => {
		localStorage.setItem(ELocalStorageKeys.submoduleId, String(submodule.id));
		set({ currentSubmodule: submodule });
	},

	userName: undefined,
	setUserName: (userName: string) => {
		set({ userName });
	},
	userRole: undefined,
	setUserRole: (userRole: IUserRole) => {
		set({ userRole });
	},
	userInformation: undefined,
	setUserInformation: (userInformation: IUserInformation) => {
		set({ userInformation });
	},
}));
