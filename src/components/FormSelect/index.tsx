import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { memo, useId } from 'react';
import { SelectProps } from 'antd';
import { Select } from '@/components/Select';

export interface IFormSelectProps<TFieldValues extends FieldValues> extends Omit<SelectProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	control: Control<TFieldValues>;
	options: { label: string; value: string | number }[];
	allowClear?: boolean;
	mode?: 'multiple' | 'tags';
	placeholder?: string;
}

const FormSelectComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	control,
	options,
	allowClear,
	mode,
	placeholder,
}: IFormSelectProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;

	const filterOption = (input: string, option: { label: string; value: string | number }) => {
		return (option.label ?? '').toLowerCase().includes(input.toLowerCase());
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message;
				return (
					<div className="flex flex-col gap-1">
						<FormLabel label={label} htmlFor={id} />
						<Select
							id={id as string}
							showSearch
							mode={mode}
							allowClear={allowClear}
							value={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							ref={field.ref}
							status={errorMsg ? 'error' : undefined}
							aria-invalid={!!errorMsg}
							aria-describedby={errorMsg ? errId : undefined}
							options={options}
							placeholder={placeholder}
							filterOption={(input, option) => filterOption(input, option as { label: string; value: string | number })}
						/>
						{errorMsg && <FormLabelError label={errorMsg} id={errId} />}
					</div>
				);
			}}
		/>
	);
};

export const FormSelect = memo(FormSelectComponent) as typeof FormSelectComponent & {
	displayName?: string;
};

FormSelect.displayName = 'FormSelect';
