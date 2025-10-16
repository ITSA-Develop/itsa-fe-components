import { Control } from 'react-hook-form';
import { LoginFormValuesBase } from './components/FormLogin';
import { FormEventHandler } from 'react';

export interface ILogin<TFieldValues extends LoginFormValuesBase = LoginFormValuesBase> {
    control: Control<TFieldValues>;
    onSubmit?: FormEventHandler<HTMLFormElement>;
}
export declare const Login: <TFieldValues extends LoginFormValuesBase = LoginFormValuesBase>({ control, onSubmit }: ILogin<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map