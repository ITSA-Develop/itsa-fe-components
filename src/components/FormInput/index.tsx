import { InputProps } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { Input } from '@/components/Input/Input';
import { memo, useId } from 'react';
import { EInput } from '@/enums';
import { TTextTransform } from '@/types';

const applyTextTransform = (value: string, transform: TTextTransform): string => {
	if (transform === 'uppercase') return value.toUpperCase();
	if (transform === 'lowercase') return value.toLowerCase();
	return value;
};

const restoreInputSelection = (input: HTMLInputElement, start: number | null, end: number | null) => {
	if (start === null || end === null) return;

	requestAnimationFrame(() => {
		input.setSelectionRange(start, end);
	});
};

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	control: Control<TFieldValues>;
	showCaracteres?: boolean;
	placeholder?: string;
	errorIdentificationExists?: string;
	autoComplete?: string;
	disabled?: boolean;
	textTransform?: TTextTransform;
}

const FormInputComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	showCaracteres,
	control,
	placeholder,
	errorIdentificationExists,
	autoComplete = 'off',
	disabled = false,
	textTransform = 'uppercase',
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				const validatMsg = errorMsg ?? errorIdentificationExists;

				const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
					const input = e.target;
					const { selectionStart, selectionEnd } = input;
					const transformedValue = applyTextTransform(input.value ?? '', textTransform);

					field.onChange(transformedValue);

					if (textTransform === 'uppercase' || textTransform === 'lowercase') {
						restoreInputSelection(input, selectionStart, selectionEnd);
					}
				};

				const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
					field.onBlur();
					field.onChange(applyTextTransform(e.target.value ?? '', textTransform));
				};

				return (
					<div className="flex flex-col gap-0.5">
						<FormLabel label={label} htmlFor={id} />
						<Input
							id={id as string}
							type={EInput.text}
							value={field.value}
							onChange={handleChange}
							onBlur={handleOnBlur}
							ref={field.ref}
							name={field.name}
							status={validatMsg !== undefined ? 'error' : undefined}
							aria-invalid={validatMsg !== undefined}
							aria-describedby={validatMsg !== undefined ? errId : undefined}
							showCountCharacters={showCaracteres}
							placeholder={placeholder}
							autoComplete={autoComplete}
							disabled={disabled}
							style={
								textTransform === 'uppercase' || textTransform === 'lowercase'
									? undefined
									: { textTransform }
							}
						/>
						{validatMsg !== undefined && <FormLabelError label={validatMsg} id={errId} />}
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
