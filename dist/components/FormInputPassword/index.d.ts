import { InputProps } from 'antd';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    showCaracteres?: boolean;
    control: Control<TFieldValues>;
    placeholder?: string;
    disabled?: boolean;
}
declare const FormInputPasswordComponent: <TFieldValues extends FieldValues>({ name, label, control, placeholder, disabled, }: IInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormInputPassword: typeof FormInputPasswordComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map