import { InputProps } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { Input } from '@/components/Input/Input';
import { memo, useId, useMemo } from 'react';
import { EInput } from '@/enums';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	control: Control<TFieldValues>;
	showCaracteres?: boolean;
	placeholder?: string;
	errorIdentificationExists?: string;
	autoComplete?: string;
}

const FormInputComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	showCaracteres,
	control,
	placeholder,
	errorIdentificationExists,
	autoComplete = 'off',
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				const validatMsg = useMemo(() => {
					if (errorMsg) {
						return errorMsg;
					}
					if (errorIdentificationExists) {
						return errorIdentificationExists;
					}
					return undefined;
				}, [errorMsg, errorIdentificationExists]);
				return (
					<div className="flex flex-col gap-1">
						<FormLabel label={label} htmlFor={id} />
						<Input
							id={id as string}
							type={EInput.text}
							value={(field.value as string | undefined) ?? ''}
							onChange={field.onChange}
							onBlur={field.onBlur}
							ref={field.ref}
							name={field.name}
							status={validatMsg ? 'error' : undefined}
							aria-invalid={!!validatMsg}
							aria-describedby={validatMsg ? errId : undefined}
							showCountCharacters={showCaracteres}
							placeholder={placeholder}
							autoComplete={autoComplete}
						/>
						{(validatMsg || errorIdentificationExists) && <FormLabelError label={validatMsg ?? ''} id={errId} />}
					</div>
				);
			}}
		/>
	);
};

export const FormInput = memo(FormInputComponent) as typeof FormInputComponent & {
	displayName?: string;
};

FormInput.displayName = 'FormInput';
