import { TimePicker, InputProps } from 'antd';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { memo, useId } from 'react';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	showCaracteres?: boolean;
	control: Control<TFieldValues>;
	placeholder?: string;
	optional?: boolean;
	disabled?: boolean;
}

const FormInputTimePickerComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	control,
	placeholder,
	optional = false,
	allowClear = true,
	disabled = false,
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				return (
					<div className="flex flex-col gap-1">
						<FormLabel label={label} htmlFor={id} optional={optional} />
						<TimePicker
							id={id}
							format={{
								format: 'HH:mm',
								type: 'mask',
							}}
							needConfirm
							value={field.value == null ? null : dayjs(field.value as string, 'HH:mm')}
							onChange={(value, timeString) => {
								if (!value) {
									field.onChange(null);
									return;
								}
								field.onChange(timeString || value.format('HH:mm'));
							}}
							onBlur={field.onBlur}
							ref={field.ref}
							name={field.name}
							status={errorMsg ? 'error' : undefined}
							aria-invalid={!!errorMsg}
							aria-describedby={errorMsg ? errId : undefined}
							placeholder={placeholder}
							allowClear={allowClear}
							disabled={disabled}
						/>
						{errorMsg && <FormLabelError label={errorMsg} id={errId} />}
					</div>
				);
			}}
		/>
	);
};

export const FormInputTimePicker = memo(FormInputTimePickerComponent) as typeof FormInputTimePickerComponent & {
	displayName?: string;
};

FormInputTimePicker.displayName = 'FormInputTimePicker';
