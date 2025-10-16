import { TInputOptions } from '../../types';
import { IEntitySchema, TFieldDisplayType } from '../../types/schema';

export declare const getDropdownFormattedOptions: (optionValues: Record<any, string>) => {
    value: string;
    label: string;
}[];
export declare const getFormattedAddress: ({ principalStreet, streetNumber, parish, canton, province, }: {
    principalStreet: string;
    streetNumber: string;
    parish?: string;
    canton: string;
    province: string;
}) => string;
export declare const getFormattedFieldValue: (key: TFieldDisplayType, value: any, populateValue: any) => string;
export declare const getFormattedSchemaValues: (elem: Record<string, any>, schema: IEntitySchema, populate?: Record<string, TInputOptions[]>) => Record<string, string>;
export declare const getSchemaColumns: (schema: IEntitySchema) => string[];
export declare const getSchemaFields: (schema: IEntitySchema) => string[];
export declare const getLabelFromValue: (value: number | string, options: TInputOptions[]) => string;
export declare function getNumberFromStorage(key: string, defaultValue?: number): number;
export declare function getStringFromStorage(key: string, defaultValue?: string): string;
//# sourceMappingURL=index.d.ts.map