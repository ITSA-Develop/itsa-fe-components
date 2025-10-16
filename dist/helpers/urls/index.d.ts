type TParam = string | number | boolean | null | undefined | object | any;
export interface IParams extends Record<string, TParam> {
}
export declare const getQueryParam: (param: string, url?: string) => string | null;
export declare const buildQueryParams: (filters: Record<string, unknown>) => string;
export declare const updateURLParams: (filters: Record<string, unknown>) => void;
export declare const getParamsFromURL: () => Record<string, string>;
export declare const clearURLParams: () => void;
export declare const addOrderParamIfMissing: (query: string, defaultOrder?: string) => string;
export declare const cleanPath: (path: string) => string;
export declare const fillRoute: (routeName: string, params?: IParams, isOpenInNewTab?: boolean) => string;
export {};
//# sourceMappingURL=index.d.ts.map