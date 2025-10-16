import { MenuItemType } from 'antd/es/menu/interface';
import { IMenuItem, IPermissionSubmodule } from '../../interfaces';
import { TExtendedMenuItem, TInputOptions } from '../../types';
import { ELocalStorageKeys } from '../../enums';

type Tree = Record<string, any>;
export declare const cleanObject: (obj: any) => any;
export declare const getMappedOptionFromLocal: (value: string | null | undefined, options: Record<string, string>) => TInputOptions;
export declare const createValueLabelMap: (options: TInputOptions[]) => Record<string, string>;
export declare const getMappedOptionFromAPI: (value: string | undefined | null | number, options: TInputOptions[]) => TInputOptions;
export declare const mapPermissionsToMenuFormat: (subModules: IPermissionSubmodule[]) => IMenuItem[];
export declare const filterMenuTree: (nodes: IMenuItem[], searchTerm: string) => IMenuItem[];
export declare const generateFilteredMenu: (subModules: IPermissionSubmodule[] | undefined, searchTerm: string) => IMenuItem[];
export declare const hasAllRequiredFields: (values: Record<string, any>, requiredFields: string[]) => boolean;
export declare const findLastChild: (tree: Tree, nodeId: string) => any;
export declare const getNestedValue: <T, U = undefined>(obj: T, path: string | string[], defaultValue?: U) => U | any;
export declare const filterMenuSidebar: (items: MenuItemType[], query: string) => MenuItemType[];
export declare const getAllMenuKeys: (items: TExtendedMenuItem[]) => string[];
export declare const dataFromLocalStorage: (key: ELocalStorageKeys) => string | null;
export declare const getValidateStatus: (msg?: string) => "error" | undefined;
export declare const cleanObj: <T extends Record<string, any>>(obj: T) => Partial<T>;
export {};
//# sourceMappingURL=index.d.ts.map