// export interface IGetPermissionResponse {
// 	code: number;
// 	message: string;
// 	result: IPermission;
// }

// export interface IPermission {
// 	agencies: IAgency[];
// }

// export interface IAgency {
// 	id: number;
// 	name: string;
// 	modules: IModule[];
// }

// export interface IModule {
// 	id: number;
// 	name: string;
// 	path: string | null;
// 	icon: string;
// 	entorno: string;
// 	submodules: ISubmodule[];
// }

// export interface ISubmodule {
// 	id: number;
// 	name: string;
// 	path: string | null;
// 	icon: string;
// 	groups?: ISubmodule[];
// 	programs?: ISubmodule[];
// 	actions?: IActions;
// }

// export interface IActions {
// 	all_actions: number;
// 	read: number;
// 	create: number;
// 	update: number;
// 	delete: number;
// }

// // Interfaces para datos transformados
// export interface IAgencyWithStats extends IAgency {
// 	totalModules: number;
// 	modules: (IModule & { totalSubmodules: number })[];
// }

// export interface IPermissionWithStats extends IGetPermissionResponse {
// 	result: {
// 		agencies: IAgencyWithStats[];
// 	};
// }

// export interface IWritableSubmodule extends ISubmodule {
// 	agencyName: string;
// 	moduleName: string;
// }
