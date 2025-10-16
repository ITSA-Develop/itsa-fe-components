import { Control } from 'react-hook-form';
import { LoginFormValuesBase } from './components/FormLogin';

export interface ILogin<TFieldValues extends LoginFormValuesBase = LoginFormValuesBase> {
    control: Control<TFieldValues>;
    onSubmit: () => void;
}
export declare const Login: <TFieldValues extends LoginFormValuesBase = LoginFormValuesBase>({ control, onSubmit }: ILogin<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map