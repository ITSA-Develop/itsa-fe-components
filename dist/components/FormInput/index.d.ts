import { InputProps } from 'antd';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    showCaracteres?: boolean;
    placeholder?: string;
    errorIdentificationExists?: string;
    autoComplete?: string;
    disabled?: boolean;
}
declare const FormInputComponent: <TFieldValues extends FieldValues>({ name, label, showCaracteres, control, placeholder, errorIdentificationExists, autoComplete, disabled, }: IInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormInput: typeof FormInputComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map