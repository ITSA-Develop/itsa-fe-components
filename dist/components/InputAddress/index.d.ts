import { IBaseInputProps, ILocationFormData, IManualAddressObject } from '../../interfaces';
import { TInputRules } from '../../types';

export interface IGoogleAutoCompleteProps extends IBaseInputProps {
    googleMapsApiKey: string;
    defaultValue: string;
    onLocationChange: (value: any) => void;
    errors?: any;
    showManualByDefault?: boolean;
    defaultManualValue?: IManualAddressObject;
    defaultLocationValues?: ILocationFormData;
    isRequired?: TInputRules | null;
    setShowManualEntry: (opt: boolean) => void;
    watch: () => {
        address: any;
    };
    setValue: (field: string, value: any) => void;
}
export interface IInputAddressProps {
    googleAutoCompleteProps: IGoogleAutoCompleteProps;
}
export declare const InputAddress: ({ googleAutoCompleteProps, }: IInputAddressProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map