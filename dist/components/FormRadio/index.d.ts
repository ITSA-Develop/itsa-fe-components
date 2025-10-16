import { Control, FieldValues, Path } from 'react-hook-form';
import { RadioGroupProps } from 'antd';

export interface IFormRadioProps<TFieldValues extends FieldValues> extends Omit<RadioGroupProps, 'form' | 'name'> {
    name: Path<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
}
declare const FormRadioComponent: <TFieldValues extends FieldValues>({ name, label, control, ...rest }: IFormRadioProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export declare const FormRadio: typeof FormRadioComponent & {
    displayName?: string;
};
export {};
//# sourceMappingURL=index.d.ts.map