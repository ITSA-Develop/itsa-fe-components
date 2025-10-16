import { InputProps } from 'antd';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    showCaracteres?: boolean;
    control: Control<TFieldValues>;
    placeholder?: string;
    optional?: boolean;
    format?: string;
}
declare const FormInputDatePickerComponent: <TFieldValues extends FieldValues>({ name, label, control, placeholder, optional, format, }: IInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormInputDatePicker: typeof FormInputDatePickerComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map