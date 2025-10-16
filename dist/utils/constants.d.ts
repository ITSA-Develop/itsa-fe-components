import { IId } from '../interfaces';
import { PermissionAction } from '../types';

import * as mdiIcons from '@mdi/js';
export declare const excludedIIdFields: (keyof IId)[];
export declare const sessionExpiredQueryParam = "sessionExpired";
export declare const newPasswordRequiredQueryParam = "newPasswordRequired";
export declare const BASE_COUNTRY = "ECUADOR";
export declare const productionDomainLink = "https://itsa-tomebamba.com";
export declare const GOOGLE_MAP_ADDRESS_KEYS: {
    streetNumber: string;
    route: string;
    intersection: string;
    postalCode: string;
    province: string;
    canton: string;
    parish: string;
    lat: string;
    long: string;
};
export declare const GOOGLE_API_KEY: any;
export declare const ENVIRONMENT: any;
export declare const REQUIRED: {
    required: string;
};
export declare const UNKNOWN_ERROR = "Error desconocido";
export declare const ICON_MAP: typeof mdiIcons;
export declare const PERMISSIONS_ACTIONS: Record<PermissionAction, PermissionAction>;
export declare const SUBDOMAINS: {
    backOffice: string;
    frontOffice: string;
    core: string;
};
export declare const AUTH_LINK = "http://192.168.7.87:8082/";
export declare const URL_PARAMS: {
    redirect: string;
};
//# sourceMappingURL=constants.d.ts.map