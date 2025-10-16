import { TInputOptions } from '../../types';

interface ILocationDisplayProps {
    isEcuador: boolean;
    label: string;
    canton?: number;
    province?: number;
    country?: number;
    parishOptions?: TInputOptions[];
    cantonOptions?: TInputOptions[];
    provinceOptions?: TInputOptions[];
    countryOptions: TInputOptions[];
}
export declare const LocationDisplay: ({ isEcuador, label, canton, province, country, cantonOptions, provinceOptions, countryOptions, }: ILocationDisplayProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LocationDisplay.d.ts.map