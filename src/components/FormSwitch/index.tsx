import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { memo } from 'react';
import { Switch } from '@/components/Switch/Switch';
import type { SwitchCustomProps } from '@/components/Switch/Switch';
import { FormLabelError } from '@/index';

export interface IFormSwitchProps<TFieldValues extends FieldValues>
	extends Omit<SwitchCustomProps, 'checked' | 'onChange'> {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	checkedLabel?: string;
	uncheckedLabel?: string;
	label?: string;
}

const FormSwitchComponent = <TFieldValues extends FieldValues>({
	name,
	control,
	checkedLabel,
	uncheckedLabel,
	label,
}: IFormSwitchProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				return (
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2" onBlur={field.onBlur}>
							<Switch
								checked={field.value}
								onChange={field.onChange}
								checkedLabel={checkedLabel}
								uncheckedLabel={uncheckedLabel}
							/>
							{label && <label className="text-sm">{label}</label>}
						</div>
						{errorMsg && <FormLabelError label={errorMsg} />}
					</div>
				);
			}}
		/>
	);
};

export const FormSwitch = memo(FormSwitchComponent) as typeof FormSwitchComponent & {
	displayName?: string;
};

FormSwitch.displayName = 'FormSwitch';
