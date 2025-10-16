import { Control, FieldValues, Path } from 'react-hook-form';
import { CheckboxProps } from 'antd';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<CheckboxProps, 'form' | 'onChange' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    onChange?: () => void;
}
declare const FormCheckBoxComponent: <TFieldValues extends FieldValues>({ name, label, control, onChange, ...rest }: IInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormCheckBox: typeof FormCheckBoxComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map