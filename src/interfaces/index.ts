export interface IGetPermissionResponse {
	code: number;
	message: string;
	result: Result;
}

export interface Result {
	agencies: IAgency[];
}

export interface IAgency {
	id: number;
	name: string;
	modules: IModule[];
}

export interface IModule {
	id: number;
	name: string;
	path: string | null;
	icon: string;
	entorno: string;
	submodules: ISubmodule[];
}

export interface ISubmodule {
	id: number;
	name: string;
	path: string | null;
	icon: string | null;
	url?: string | null;
	groups?: ISubmodule[];
	programs?: ISubmodule[];
	actions?: IActions;
}

export interface IActions {
	all_actions: number;
	read: number;
	create: number;
	update: number;
	delete: number;
}

export interface ISelectOptionDropdownButton {
	items: {
		key: string;
		label: string;
		onClick?: (id: string) => void;
	}[];
}

export interface IValidateRouteResponse {
	code: number;
	message: string;
	result: boolean;
}
//--------------------------------------------------->
// TODO: clean up this file after implementations starts
import { EAddressType, EEmailType, EPhoneConnectionType, EPhoneType } from '@/enums';
import { TDate, TInputOptions, TInputRules } from '@/types';
import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export interface IBaseInputProps {
	name: string;
	label: string;
	placeholder?: string;
	rules?: TInputRules;
	error?: string;
	isDisabled?: boolean;
	defaultValue?: string | boolean | number | TInputOptions | TInputOptions[] | null | undefined;
	maxLen?: number;
}

export interface IBaseInputDate extends IBaseInputProps {
	minDate?: Dayjs;
	maxDate?: Dayjs;
	isDisableFuture?: boolean;
	isDisablePast?: boolean;
	shouldOpen?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
}

// TODO: double check with BE what is going to be the Iid returned by default.
export interface IId {
	id: string;
	modified_by: string;
	created_by: string;
	modified_on: TDate;
	created_on: TDate;
}

export interface IManualAddressObject {
	principalStreet: string;
	latitude: number;
	longitude: number;
	postalCode: string;
	province?: number;
	canton?: number;
	parish?: number;
}

export interface ILocationFormData {
	province: string | TInputOptions | null;
	canton: string | TInputOptions | null;
	parish: string | TInputOptions | null;
}

export interface IMultipleEmailItem {
	emailType: EEmailType | string;
	email: string;
	isPrincipal: boolean;
}

export interface IMultiplePhoneItem {
	phoneConnectionType: EPhoneConnectionType | string;
	phoneType: EPhoneType | string;
	phone: string;
	phoneAreaCode: string;
	isPrincipal: boolean;
}

export interface IMultipleAddressItem {
	addressType: EAddressType | string;
	address: {
		principalStreet: string;
		latitude: number;
		longitude: number;
		streetNumber: string;
		provinceId: number;
		cantonId: number;
		parishId: number;
		isManualAddress: boolean;
	};
	isPrincipal: boolean;
	fullAddress: string;
	addressReference: string;
}

export interface IActionPanelOption {
	title: string | ReactNode;
	confirm?: {
		title: string;
		message: string | ReactNode;
	};
	route?: string;
	action?: () => void;
	hidden?: boolean;
	disabled?: boolean;
	target?: string;
}

export interface IPermissionBasic {
	id: number;
	name: string;
}
export interface IPermissionActions {
	update: number;
	delete: number;
	create: number;
	read: number;
	all_actions: number;
}

export interface IPermissionProgram extends IPermissionBasic {
	icon: string;
	actions: IPermissionActions;
	path: string;
	programs?: IPermissionProgram[];
}

export interface IPermissionSubmodule extends IPermissionBasic {
	icon: string;
	path: string;
	programs: IPermissionProgram[];
	groups?: IPermissionProgram[];
}
export interface IPermissionModule extends IPermissionBasic {
	submodules: IPermissionSubmodule[];
}

export interface IPermissionAgency extends IPermissionBasic {
	modules: IPermissionModule[];
}
export interface IPermission extends IPermissionBasic {
	agencies: IPermissionAgency[];
}

export interface IMenuItem {
	title: string;
	icon: string;
	id?: number;
	name?: string;
	path?: string;
	actions?: IPermissionActions;
	groups?: IMenuItem[];
	subList?: IMenuItem[];
}

export interface IUserInfo {
	identification: string;
	identificationType: string;
	name: string;
	picture: string;
	email: string;
	roles: {
		name: string;
	}[];
}

export interface IControllerProps {
	isForm?: boolean;
	isEditable?: boolean;
	isDetail?: boolean;
}

export interface IModalResponsiveProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	onOk: () => void;
	setOnOk: (onOk: () => void) => void;
	onCancel: () => void;
	setOnCancel: (onCancel: () => void) => void;
	title: string;
	setTitle: (title: string) => void;
	footer: ReactNode;
	setFooter: (footer: ReactNode) => void;
	content: ReactNode;
	setContent: (content: ReactNode) => void;
}

export interface ITabsMaintenanceItem {
	key: string;
	label: string;
	children: ReactNode;
	icon?: ReactNode;
}
