import { InputProps } from 'antd';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    showCaracteres?: boolean;
    control: Control<TFieldValues>;
    placeholder?: string;
    optional?: boolean;
    disabled?: boolean;
}
declare const FormInputTimePickerComponent: <TFieldValues extends FieldValues>({ name, label, control, placeholder, optional, allowClear, disabled, }: IInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormInputTimePicker: typeof FormInputTimePickerComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map