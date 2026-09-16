import { memo } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormInputDatePicker, type IInputProps } from '@/components/FormInputDatePicker';

export type IFormInputBirthDatePickerProps<TFieldValues extends FieldValues> = Omit<
	IInputProps<TFieldValues>,
	'allowPastDates'
>;

const FormInputBirthDatePickerComponent = <TFieldValues extends FieldValues>(
	props: IFormInputBirthDatePickerProps<TFieldValues>,
) => <FormInputDatePicker<TFieldValues> {...props} allowPastDates />;

export const FormInputBirthDatePicker = memo(
	FormInputBirthDatePickerComponent,
) as typeof FormInputBirthDatePickerComponent & {
	displayName?: string;
};

FormInputBirthDatePicker.displayName = 'FormInputBirthDatePicker';
