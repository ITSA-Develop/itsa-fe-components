import { ELocalStorageKeys } from '@/enums';
import { setDataEncryptedInStorage } from '@/helpers/encrypt';
import { IAgency, IModule, ISubmodule, IUserInformation, IUserRole } from '@/interfaces';
import { DefaultOptionType } from 'antd/es/select';
import { create } from 'zustand';

export interface AppLayoutStore {
	agencies: IAgency[];
	setAgencies: (agencies: IAgency[]) => void;

	modulesAgency: IModule[];
	setModulesAgency: (modules: IModule[]) => void;

	submodulesAgency: ISubmodule[];
	setSubmodulesAgency: (submodules: ISubmodule[]) => void;

	currentAgency?: IAgency;
	setCurrentAgency: (agency: IAgency, KEY_ENCRYPT: CryptoJS.lib.WordArray) => void;

	currentSubAgency?: IAgency;
	setCurrentSubAgency: (subagency: IAgency, KEY_ENCRYPT: CryptoJS.lib.WordArray) => void;

	currentCompany?: DefaultOptionType;
	setCurrentCompany: (company: DefaultOptionType, KEY_ENCRYPT: CryptoJS.lib.WordArray) => void;

	currentModule?: IModule;
	setCurrentModule: (module: IModule, KEY_ENCRYPT: CryptoJS.lib.WordArray) => void;
	currentSubmodule?: ISubmodule;
	setCurrentSubmodule: (submodule: ISubmodule, KEY_ENCRYPT: CryptoJS.lib.WordArray) => void;

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
	setCurrentAgency: (agency: IAgency, KEY_ENCRYPT: CryptoJS.lib.WordArray) => {
		set({
			currentAgency: agency,
		});
		setDataEncryptedInStorage(ELocalStorageKeys.agency, String(agency.id), KEY_ENCRYPT);
	},
	currentSubAgency: undefined,
	setCurrentSubAgency: (subagency: IAgency, KEY_ENCRYPT: CryptoJS.lib.WordArray) => {
		set({
			currentSubAgency: subagency,
		});
		setDataEncryptedInStorage(ELocalStorageKeys.subagency, String(subagency.id), KEY_ENCRYPT);
	},
	currentCompany: undefined,
	setCurrentCompany: (company: DefaultOptionType, KEY_ENCRYPT: CryptoJS.lib.WordArray) => {
		set({
			currentCompany: company,
		});
		setDataEncryptedInStorage(ELocalStorageKeys.company, String(company.id), KEY_ENCRYPT);
	},
	currentModule: undefined,
	setCurrentModule: (module: IModule, KEY_ENCRYPT: CryptoJS.lib.WordArray) => {
		setDataEncryptedInStorage(ELocalStorageKeys.module, String(module.id), KEY_ENCRYPT);
		setDataEncryptedInStorage(ELocalStorageKeys.moduleHomeSelected, String(module.id), KEY_ENCRYPT);
		const newSubmodule = module?.submodules?.[0];
		set({
			currentModule: module,
			submodulesAgency: module?.submodules ?? [],
			currentSubmodule: newSubmodule,
		});
	},
	currentSubmodule: undefined,
	setCurrentSubmodule: (submodule: ISubmodule, KEY_ENCRYPT: CryptoJS.lib.WordArray) => {
		setDataEncryptedInStorage(ELocalStorageKeys.submodule, String(submodule.id), KEY_ENCRYPT);
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
