import { IAgency, IModule, IPermissions, ISubAgency, ISubmodule } from '@/interfaces';
import { DefaultOptionType } from 'antd/es/select';
import { create } from 'zustand';

export interface StoredAppLayoutSelection {
	companyValue?: string;
	agencyId?: number;
	subAgencyId?: number;
	moduleId?: number;
	submoduleId?: number;
}

export interface ResolvedPermissionSelection {
	agency?: IAgency;
	subAgency?: ISubAgency;
	module?: IModule;
	currentSubmodule?: ISubmodule;
}

const optionValue = (option?: DefaultOptionType): string | undefined =>
	option?.value === undefined || option.value === null ? undefined : String(option.value);

export const resolveCompany = (
	options: DefaultOptionType[],
	preferredValue?: string,
): DefaultOptionType | undefined =>
	options.find(option => optionValue(option) === preferredValue) ?? options[0];

export const resolvePermissionSelection = (
	permissions: IPermissions,
	preferred: StoredAppLayoutSelection,
): ResolvedPermissionSelection => {
	const availableSubAgencies = permissions.agencies.flatMap(agency =>
		agency.subAgencies.map(subAgency => ({ agency, subAgency })),
	);
	const preferredPair = availableSubAgencies.find(
		item =>
			item.subAgency.id === preferred.subAgencyId &&
			(preferred.agencyId === undefined || item.agency.id === preferred.agencyId),
	);
	const selectedPair = preferredPair ?? availableSubAgencies[0];

	if (!selectedPair) {
		return {
			agency: undefined,
			subAgency: undefined,
			module: undefined,
			currentSubmodule: undefined,
		};
	}

	const module =
		selectedPair.subAgency.modules.find(item => item.id === preferred.moduleId) ??
		selectedPair.subAgency.modules[0];
	const currentSubmodule =
		module?.submodules.find(item => item.id === preferred.submoduleId) ?? module?.submodules[0];

	return {
		agency: selectedPair.agency,
		subAgency: selectedPair.subAgency,
		module,
		currentSubmodule,
	};
};

const permissionIds = (selection: ResolvedPermissionSelection): StoredAppLayoutSelection => ({
	agencyId: selection.agency?.id,
	subAgencyId: selection.subAgency?.id,
	moduleId: selection.module?.id,
	submoduleId: selection.currentSubmodule?.id,
});

export interface AppLayoutStore {
	permissions?: IPermissions;
	companyOptions: DefaultOptionType[];
	companyOptionsReady: boolean;
	selectionIds: StoredAppLayoutSelection;
	hydrated: boolean;

	agency?: IAgency;
	subAgency?: ISubAgency;
	module?: IModule;
	currentSubmodule?: ISubmodule;
	currentCompany?: DefaultOptionType;

	hydrateSelection: (selection: StoredAppLayoutSelection) => void;
	setPermissions: (permissions: IPermissions) => void;
	setCompanyOptions: (options: DefaultOptionType[], ready?: boolean) => void;
	selectCompany: (value: string) => void;
	selectSubAgency: (subAgencyId: number, agencyId?: number) => void;
	selectModule: (moduleId: number) => void;
}

export const useAppLayoutStore = create<AppLayoutStore>((set, get) => ({
	permissions: undefined,
	companyOptions: [],
	companyOptionsReady: false,
	selectionIds: {},
	hydrated: false,
	agency: undefined,
	subAgency: undefined,
	module: undefined,
	currentSubmodule: undefined,
	currentCompany: undefined,

	hydrateSelection: selection => {
		const state = get();
		const currentCompany = state.companyOptionsReady
			? resolveCompany(state.companyOptions, selection.companyValue)
			: undefined;
		const permissionSelection = state.permissions
			? resolvePermissionSelection(state.permissions, selection)
			: {};

		set({
			hydrated: true,
			selectionIds: {
				...selection,
				...(state.companyOptionsReady ? { companyValue: optionValue(currentCompany) } : {}),
				...(state.permissions ? permissionIds(permissionSelection) : {}),
			},
			currentCompany,
			...permissionSelection,
		});
	},

	setPermissions: permissions => {
		const permissionSelection = resolvePermissionSelection(permissions, get().selectionIds);
		set(state => ({
			permissions,
			...permissionSelection,
			selectionIds: {
				...state.selectionIds,
				...permissionIds(permissionSelection),
			},
		}));
	},

	setCompanyOptions: (companyOptions, ready = true) => {
		const currentCompany = ready
			? resolveCompany(companyOptions, get().selectionIds.companyValue)
			: undefined;
		set(state => ({
			companyOptions,
			companyOptionsReady: ready,
			currentCompany,
			selectionIds: ready
				? { ...state.selectionIds, companyValue: optionValue(currentCompany) }
				: state.selectionIds,
		}));
	},

	selectCompany: value => {
		const currentCompany = resolveCompany(get().companyOptions, value);
		set(state => ({
			currentCompany,
			selectionIds: { ...state.selectionIds, companyValue: optionValue(currentCompany) },
		}));
	},

	selectSubAgency: (subAgencyId, agencyId) => {
		const permissions = get().permissions;
		if (!permissions) return;

		const permissionSelection = resolvePermissionSelection(permissions, { agencyId, subAgencyId });
		set(state => ({
			...permissionSelection,
			selectionIds: {
				...state.selectionIds,
				...permissionIds(permissionSelection),
			},
		}));
	},

	selectModule: moduleId => {
		const state = get();
		if (!state.subAgency) return;

		const module = state.subAgency.modules.find(item => item.id === moduleId) ?? state.subAgency.modules[0];
		const currentSubmodule = module?.submodules[0];
		set(currentState => ({
			module,
			currentSubmodule,
			selectionIds: {
				...currentState.selectionIds,
				moduleId: module?.id,
				submoduleId: currentSubmodule?.id,
			},
		}));
	},
}));
