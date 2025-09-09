import { InputProps } from 'antd';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { Input } from '@/components/Input/Input';
import { memo, useId } from 'react';
import { EInput } from '@/enums';
import { filterPositiveNumbersOnly } from '@/helpers';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	showCaracteres?: boolean;
	control: Control<TFieldValues>;
	placeholder?: string;
}

const FormInputComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	showCaracteres,
	control,
	placeholder,
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;

	const handleValueChange = (value: string, field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => {
		const cleanValue = filterPositiveNumbersOnly(value);
		if (cleanValue === '' || cleanValue === undefined || cleanValue === null) {
			field.onChange(undefined);
		} else {
			const numValue = Number(cleanValue);
			field.onChange(isNaN(numValue) ? undefined : numValue);
		}
	};

	const handleBlur = (value: string, field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => {
		const cleanValue = filterPositiveNumbersOnly(value);
		if (cleanValue === '' || cleanValue === undefined || cleanValue === null) {
			field.onChange(undefined);
		} else {
			const numValue = Number(cleanValue);
			field.onChange(isNaN(numValue) ? undefined : numValue);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Permitir teclas de control (backspace, delete, tab, escape, enter, etc.)
		if (
			e.key === 'Backspace' ||
			e.key === 'Delete' ||
			e.key === 'Tab' ||
			e.key === 'Escape' ||
			e.key === 'Enter' ||
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowRight' ||
			e.key === 'ArrowUp' ||
			e.key === 'ArrowDown' ||
			e.key === 'Home' ||
			e.key === 'End' ||
			(e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x'))
		) {
			return;
		}

		// Permitir números (0-9)
		if (/^[0-9]$/.test(e.key)) {
			return;
		}

		// Permitir punto decimal solo si no hay uno ya y no está al inicio
		const currentValue = (e.target as HTMLInputElement).value;
		if (e.key === '.' && !currentValue.includes('.') && currentValue.length > 0) {
			return;
		}

		// Bloquear cualquier otra tecla
		e.preventDefault();
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				return (
					<div className="flex flex-col gap-1">
						<FormLabel label={label} htmlFor={id} />
						<Input
							id={id as string}
							type={EInput.number}
							value={field.value ?? ''}
							onChange={(e) => handleValueChange(e.target.value, field)}
							onBlur={(e) => handleBlur(e.target.value, field)}
							onKeyDown={handleKeyDown}
							ref={field.ref}
							name={field.name}
							status={errorMsg ? 'error' : undefined}
							aria-invalid={!!errorMsg}
							aria-describedby={errorMsg ? errId : undefined}
							showCountCharacters={showCaracteres}
							min={0}
							step="any"
							placeholder={placeholder}
						/>
						{errorMsg && <FormLabelError label={errorMsg} id={errId} />}
					</div>
				);
			}}
		/>
	);
};

export const FormInputNumber = memo(FormInputComponent) as typeof FormInputComponent & {
	displayName?: string;
};

FormInputNumber.displayName = 'FormInputNumber';
