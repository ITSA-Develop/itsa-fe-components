export declare const getPostalCodeFromLatLng: (lat: number, lng: number) => void;
export interface DefaultOptionType extends BaseOptionType {
    label?: React.ReactNode;
    value?: string | number | null;
    children?: Omit<DefaultOptionType, 'children'>[];
}
export declare const filterOptions: (input: string, option?: DefaultOptionType) => boolean;
//# sourceMappingURL=index.d.ts.map