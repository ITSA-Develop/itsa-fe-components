import { IId } from '@/interfaces';
import * as mdiIcons from '@mdi/js';
import { PermissionAction } from '../types';

// TODO: double check with BE what is going to be the Iid returned by default.
export const excludedIIdFields: (keyof IId)[] = ['id', 'modified_by', 'created_by', 'modified_on', 'created_on'];

export const sessionExpiredQueryParam = 'sessionExpired';
export const newPasswordRequiredQueryParam = 'newPasswordRequired';

export const BASE_COUNTRY = 'ECUADOR';

export const productionDomainLink = 'https://itsa-tomebamba.com'; // TODO: TBD

export const GOOGLE_MAP_ADDRESS_KEYS = {
	streetNumber: 'street_number',
	route: 'route',
	postalCode: 'postal_code',
	province: 'administrative_area_level_1',
	canton: 'administrative_area_level_2',
	parish: 'sublocality_level_1',
	lat: 'lat',
	long: 'long',
};

export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const ENVIRONMENT = import.meta.env.VITE_ENV;

export const REQUIRED = { required: 'Requerido' };

export const UNKNOWN_ERROR = 'Error desconocido';

export const ICON_MAP = mdiIcons;

export const PERMISSIONS_ACTIONS: Record<PermissionAction, PermissionAction> = {
	create: 'create',
	read: 'read',
	update: 'update',
	delete: 'delete',
	all_actions: 'all_actions',
};

export const SUBDOMAINS = {
	backOffice: 'backoffice',
	frontOffice: 'frontoffice',
	core: 'core',
};

export const AUTH_LINK = 'http://192.168.7.87:8082/'; // TODO: update this when they have clear the domain

export const URL_PARAMS = {
	redirect: 'redirect',
};
