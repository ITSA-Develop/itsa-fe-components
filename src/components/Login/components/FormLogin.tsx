import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { FormInputPassword } from '@/components/FormInputPassword';
import { Control, Path } from 'react-hook-form';

export type LoginFormValuesBase = { username: string; password: string };

export interface IFormLogin<TFieldValues extends LoginFormValuesBase = LoginFormValuesBase> {
    control: Control<TFieldValues>;
    onSubmit: () => void;
}
export const FormLogin = <TFieldValues extends LoginFormValuesBase = LoginFormValuesBase>({ control, onSubmit }: IFormLogin<TFieldValues>) => {
	return (
		<form className="flex flex-col gap-4 w-full p-8">
            <FormInput
                name={"username" as Path<TFieldValues>}
                label="Usuario"
                placeholder="Ej. roberto.giler@tomebamba.com.ec"
                control={control}
            />
			<FormInputPassword
				type="password"
                name={"password" as Path<TFieldValues>}
				label="Contraseña"
				placeholder="**********"
				control={control}
			/>
			<Button
				type="primary"
				size="middle"
				label="Iniciar sesión"
				onClick={onSubmit}
			/>
		</form>
	);
};
