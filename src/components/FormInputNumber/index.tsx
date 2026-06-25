import { InputProps } from 'antd';
import {
	Control,
	Controller,
	ControllerRenderProps,
	FieldValues,
	Path,
} from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { Input } from '@/components/Input/Input';
import { memo, useEffect, useId, useMemo, useState } from 'react';
import { EInput } from '@/enums';
import { filterPositiveNumbersOnly, parsePositiveDecimal } from '@/helpers';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	showCaracteres?: boolean;
	control: Control<TFieldValues>;
	placeholder?: string;
	disabled?: boolean;
	suffix?: string;
	prefix?: string;
}

const formatNumberValue = (value: unknown): string => {
	if (value === null || value === undefined || value === '') return '';
	return String(value);
};

const restoreInputSelection = (input: HTMLInputElement, start: number | null, end: number | null) => {
	if (start === null || end === null) return;

	requestAnimationFrame(() => {
		input.setSelectionRange(start, end);
	});
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

	if (/^[0-9]$/.test(e.key)) {
		return;
	}

	const currentValue = (e.target as HTMLInputElement).value;
	if (e.key === '.' && !currentValue.includes('.')) {
		return;
	}

	e.preventDefault();
};

type FormInputNumberFieldProps<TFieldValues extends FieldValues> = {
	field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
	errorMsg?: string;
	id: string;
	errId: string;
	showCaracteres?: boolean;
	placeholderUppercase: string;
	disabled: boolean;
	prefix?: string;
	suffix?: string;
};

const FormInputNumberField = <TFieldValues extends FieldValues>({
	field,
	errorMsg,
	id,
	errId,
	showCaracteres,
	placeholderUppercase,
	disabled,
	prefix,
	suffix,
}: FormInputNumberFieldProps<TFieldValues>) => {
	const [displayValue, setDisplayValue] = useState(() => formatNumberValue(field.value));
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!isFocused) {
			setDisplayValue(formatNumberValue(field.value));
		}
	}, [field.value, isFocused]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const { selectionStart, selectionEnd } = input;
		const cleanValue = filterPositiveNumbersOnly(input.value);

		setDisplayValue(cleanValue);

		if (cleanValue === '') {
			field.onChange(null);
		} else if (cleanValue !== '.' && !cleanValue.endsWith('.')) {
			const numValue = parsePositiveDecimal(cleanValue);
			if (numValue !== null) {
				field.onChange(numValue);
			}
		}

		restoreInputSelection(input, selectionStart, selectionEnd);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		field.onBlur();

		const cleanValue = filterPositiveNumbersOnly(e.target.value);
		const numValue = parsePositiveDecimal(cleanValue);

		field.onChange(numValue);
		setDisplayValue(numValue === null ? '' : String(numValue));
	};

	return (
		<Input
			id={id}
			type={EInput.text}
			inputMode="decimal"
			value={displayValue}
			onChange={handleChange}
			onFocus={() => setIsFocused(true)}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
			ref={field.ref}
			name={field.name}
			status={errorMsg !== undefined ? 'error' : undefined}
			aria-invalid={errorMsg !== undefined}
			aria-describedby={errorMsg !== undefined ? errId : undefined}
			showCountCharacters={showCaracteres}
			placeholder={placeholderUppercase}
			disabled={disabled}
			prefix={prefix}
			suffix={suffix}
		/>
	);
};

const FormInputComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	showCaracteres,
	control,
	placeholder,
	disabled = false,
	suffix,
	prefix,
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;

	const placeholderUppercase = useMemo(() => {
		if (placeholder !== undefined && placeholder.trim().length > 0) {
			return placeholder.toUpperCase();
		}
		return 'Ingrese un valor numérico';
	}, [placeholder]);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;

				return (
					<div className="flex flex-col gap-0.5">
						<FormLabel label={label} htmlFor={id} />
						<FormInputNumberField
							field={field}
							errorMsg={errorMsg}
							id={id as string}
							errId={errId}
							showCaracteres={showCaracteres}
							placeholderUppercase={placeholderUppercase}
							disabled={disabled}
							prefix={prefix}
							suffix={suffix}
						/>
						{errorMsg !== undefined && <FormLabelError label={errorMsg} id={errId} />}
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
