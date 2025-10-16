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
declare const FormInputComponent: <TFieldValues extends FieldValues>({ name, label, showCaracteres, control, placeholder, disabled, }: IInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormInputNumber: typeof FormInputComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map