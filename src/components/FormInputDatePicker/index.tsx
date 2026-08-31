import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { memo, useId, useState } from 'react';
import dayjs, { type Dayjs, type OpUnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EDateMaskFormat } from '@/enums';

dayjs.extend(customParseFormat);

const hasTimeTokens = (format: string) => format.includes('HH') || format.includes('mm') || format.includes('ss');

type TMinuteStep = DatePickerProps['minuteStep'];
type TDisabledDate = NonNullable<DatePickerProps['disabledDate']>;
type TDisabledTime = NonNullable<DatePickerProps['disabledTime']>;

const getPastDateError = (format: string) =>
	hasTimeTokens(format)
		? 'La fecha y hora no pueden ser anteriores a la fecha y hora actuales'
		: 'La fecha no puede ser anterior a la fecha actual';

const getComparisonUnit = (format: string): OpUnitType => {
	if (format.includes('ss')) return 'second';
	if (format.includes('mm')) return 'minute';
	if (format.includes('HH')) return 'hour';
	return 'day';
};

const isBeforeCurrentDate = (value: Dayjs, format: string) =>
	value.isBefore(dayjs(), getComparisonUnit(format));

const getPreviousValues = (currentValue: number) =>
	Array.from({ length: currentValue }, (_, index) => index);

const getPastTimeConfig = (selectedDate: Dayjs | null, format: string) => {
	if (!selectedDate || !selectedDate.isSame(dayjs(), 'day')) return {};

	const now = dayjs();
	const includesMinutes = format.includes('mm');
	const includesSeconds = format.includes('ss');

	return {
		disabledHours: () => getPreviousValues(now.hour()),
		disabledMinutes: (selectedHour: number) =>
			includesMinutes && selectedHour === now.hour() ? getPreviousValues(now.minute()) : [],
		disabledSeconds: (selectedHour: number, selectedMinute: number) =>
			includesSeconds && selectedHour === now.hour() && selectedMinute === now.minute()
				? getPreviousValues(now.second())
				: [],
	};
};

const mergeDisabledValues = (
	internal?: () => number[],
	custom?: () => number[],
) => {
	if (!internal && !custom) return undefined;
	return () => Array.from(new Set([...(internal?.() ?? []), ...(custom?.() ?? [])]));
};

const getShowTimeConfig = (format: string, minuteStep?: TMinuteStep): DatePickerProps['showTime'] => {
	if (!hasTimeTokens(format)) {
		return false;
	}

	if (format.includes('ss')) {
		return { format: 'HH:mm:ss', minuteStep };
	}

	return { format: 'HH:mm', minuteStep };
};

export interface IInputProps<TFieldValues extends FieldValues>
	extends Omit<DatePickerProps, 'value' | 'onChange' | 'defaultValue' | 'format'> {
	name: Path<TFieldValues>;
	label: string;
	control: Control<TFieldValues>;
	placeholder?: string;
	optional?: boolean;
	format?: EDateMaskFormat | string;
	disabled?: boolean;
}

const FormInputDatePickerComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	control,
	placeholder,
	optional = false,
	format = EDateMaskFormat.YYYYMMDD,
	disabled = false,
	allowClear = true,
	minuteStep,
	disabledDate: customDisabledDate,
	disabledTime: customDisabledTime,
	...rest
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;
	const [constraintError, setConstraintError] = useState<string>();
	const resolvedShowTime = getShowTimeConfig(format, minuteStep);
	const pastDateError = getPastDateError(format);

	const disabledDate: TDisabledDate = (...args) => {
		const [currentDate] = args;
		const isPastDay = currentDate.startOf('day').isBefore(dayjs().startOf('day'));
		return isPastDay || Boolean(customDisabledDate?.(...args));
	};

	const disabledTime: TDisabledTime = (...args) => {
		const [selectedDate] = args;
		const internalConfig = getPastTimeConfig(selectedDate, format);
		const customConfig = customDisabledTime?.(...args) ?? {};

		return {
			...customConfig,
			disabledHours: mergeDisabledValues(internalConfig.disabledHours, customConfig.disabledHours),
			disabledMinutes: (selectedHour: number) =>
				Array.from(
					new Set([
						...(internalConfig.disabledMinutes?.(selectedHour) ?? []),
						...(customConfig.disabledMinutes?.(selectedHour) ?? []),
					]),
				),
			disabledSeconds: (selectedHour: number, selectedMinute: number) =>
				Array.from(
					new Set([
						...(internalConfig.disabledSeconds?.(selectedHour, selectedMinute) ?? []),
						...(customConfig.disabledSeconds?.(selectedHour, selectedMinute) ?? []),
					]),
				),
		};
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const dateValue = field.value ? dayjs(field.value, format, true) : null;
				const isStoredValuePast =
					Boolean(dateValue?.isValid()) && isBeforeCurrentDate(dateValue as Dayjs, format);
				const errorMsg =
					(fieldState.error?.message as string | undefined) ??
					constraintError ??
					(isStoredValuePast ? pastDateError : undefined);
				return (
					<div className="flex flex-col">
						<FormLabel label={label} htmlFor={id} optional={optional} />
						<DatePicker
							{...rest}
							id={id}
							format={{
								format,
								type: 'mask',
							}}
							showTime={resolvedShowTime}
							needConfirm={Boolean(resolvedShowTime)}
							value={dateValue?.isValid() && !isStoredValuePast ? dateValue : null}
							onChange={(value) => {
								if (value && isBeforeCurrentDate(value, format)) {
									setConstraintError(pastDateError);
									field.onChange(null);
									return;
								}

								setConstraintError(undefined);
								const formattedValue = value ? value.format(format) : null;
								field.onChange(formattedValue);
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
							disabledDate={disabledDate}
							disabledTime={disabledTime}
						/>
						{errorMsg && <FormLabelError label={errorMsg} id={errId} />}
					</div>
				);
			}}
		/>
	);
};

export const FormInputDatePicker = memo(FormInputDatePickerComponent) as typeof FormInputDatePickerComponent & {
	displayName?: string;
};

FormInputDatePicker.displayName = 'FormInputDatePicker';
