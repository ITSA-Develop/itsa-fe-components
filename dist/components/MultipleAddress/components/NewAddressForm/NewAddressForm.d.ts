import { ILocationFormData, IManualAddressObject } from '../../../../interfaces';
import { TInputOptions } from '../../../../types';

interface INewAddressFormProps {
    addressValue: string;
    googleMapsApiKey: string;
    locationOptions: {
        provincesOpts: TInputOptions[];
        cantonsOpts: TInputOptions[];
        parishesOpts: TInputOptions[];
    };
    onLocationChange: (value: any) => void;
    setAddressObject: (addressObject: IManualAddressObject) => void;
    handleAddAddress: () => void;
    handleCancel: () => void;
    defaultManualValue?: IManualAddressObject;
    defaultLocationValues?: ILocationFormData;
    isSingleAddress?: boolean;
    errors?: {
        address: string;
        addressType: string;
    };
}
export declare const NewAddressForm: ({ googleMapsApiKey, onLocationChange, setAddressObject, locationOptions, handleAddAddress, handleCancel, isSingleAddress, errors, }: INewAddressFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NewAddressForm.d.ts.map