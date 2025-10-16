import { Control, FieldValues, Path } from 'react-hook-form';
import { SelectProps } from 'antd';

export interface IFormSelectProps<TFieldValues extends FieldValues> extends Omit<SelectProps, 'form' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    options: {
        label: string;
        value: string | number;
    }[];
    allowClear?: boolean;
    mode?: 'multiple' | 'tags';
    placeholder?: string;
    isLoading?: boolean;
    disabled?: boolean;
}
declare const FormSelectComponent: <TFieldValues extends FieldValues>({ name, label, control, options, allowClear, mode, placeholder, isLoading, disabled, }: IFormSelectProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormSelect: typeof FormSelectComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map