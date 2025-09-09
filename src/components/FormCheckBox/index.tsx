import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { memo } from 'react';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { CheckboxProps } from 'antd';
import { FormLabelError } from '@/index';

export interface IInputProps<TFieldValues extends FieldValues> extends Omit<CheckboxProps, 'form' | 'name'> {
	name: Path<TFieldValues>;
	label: string;
	control: Control<TFieldValues>;
}

const FormCheckBoxComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	control,
	...rest
}: IInputProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				return (
					<div className="flex flex-col gap-1">
						<Checkbox
							{...rest}
							variant="default"
							checked={field.value}
							onChange={e => field.onChange(e.target.checked)}
							onBlur={field.onBlur}
						>
							{label}
						</Checkbox>
						{errorMsg && <FormLabelError label={errorMsg} />}
					</div>
				);
			}}
		/>
	);
};

export const FormCheckBox = memo(FormCheckBoxComponent) as typeof FormCheckBoxComponent & {
	displayName?: string;
};

FormCheckBox.displayName = 'FormCheckBox';
