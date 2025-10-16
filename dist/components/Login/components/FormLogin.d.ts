import { Control } from 'react-hook-form';

export type LoginFormValuesBase = {
    username: string;
    password: string;
};
export interface IFormLogin<TFieldValues extends LoginFormValuesBase = LoginFormValuesBase> {
    control: Control<TFieldValues>;
    onSubmit: () => void;
}
export declare const FormLogin: <TFieldValues extends LoginFormValuesBase = LoginFormValuesBase>({ control, onSubmit }: IFormLogin<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormLogin.d.ts.map