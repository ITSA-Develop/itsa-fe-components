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
	if (selectedDate === null || !selectedDate.isSame(dayjs(), 'day')) return {};

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
	/** Permite fechas anteriores. Uso interno para componentes especializados. */
	allowPastDates?: boolean;
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
	allowPastDates = false,
	...rest
}: IInputProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;
	const [constraintError, setConstraintError] = useState<string>();
	const resolvedShowTime = getShowTimeConfig(format, minuteStep);
	const pastDateError = getPastDateError(format);

	const disabledDate: TDisabledDate = (...args) => {
		const [currentDate] = args;
		const isPastDay =
			!allowPastDates && currentDate.startOf('day').isBefore(dayjs().startOf('day'));
		return isPastDay || Boolean(customDisabledDate?.(...args));
	};

	const disabledTime: TDisabledTime = (...args) => {
		const [selectedDate] = args;
		const internalConfig = allowPastDates ? {} : getPastTimeConfig(selectedDate, format);
		const customConfig = customDisabledTime?.(...args) ?? {};

		return {
			...customConfig,
			disabledHours: () => [
				...(internalConfig.disabledHours?.() ?? []),
				...(customConfig.disabledHours?.() ?? []),
			],
			disabledMinutes: selectedHour => [
				...(internalConfig.disabledMinutes?.(selectedHour) ?? []),
				...(customConfig.disabledMinutes?.(selectedHour) ?? []),
			],
			disabledSeconds: (selectedHour, selectedMinute) => [
				...(internalConfig.disabledSeconds?.(selectedHour, selectedMinute) ?? []),
				...(customConfig.disabledSeconds?.(selectedHour, selectedMinute) ?? []),
			],
		};
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const fieldError = fieldState.error?.message as string | undefined;
				const dateValue =
					typeof field.value === 'string' && field.value.length > 0
						? dayjs(field.value, format, true)
						: null;
				const isStoredValuePast =
					!allowPastDates &&
					dateValue?.isValid() === true &&
					isBeforeCurrentDate(dateValue, format);
				const errorMsg =
					fieldError ??
					constraintError ??
					(isStoredValuePast ? pastDateError : undefined);
				const hasError = typeof errorMsg === 'string' && errorMsg.length > 0;
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
							value={dateValue?.isValid() === true && !isStoredValuePast ? dateValue : null}
							onChange={value => {
								if (
									!allowPastDates &&
									value !== null &&
									isBeforeCurrentDate(value, format)
								) {
									setConstraintError(pastDateError);
									field.onChange(null);
									return;
								}

								setConstraintError(undefined);
								const formattedValue = value !== null ? value.format(format) : null;
								field.onChange(formattedValue);
							}}
							onBlur={field.onBlur}
							ref={field.ref}
							name={field.name}
							status={hasError ? 'error' : undefined}
							aria-invalid={hasError}
							aria-describedby={hasError ? errId : undefined}
							placeholder={placeholder}
							allowClear={allowClear}
							disabled={disabled}
							disabledDate={disabledDate}
							disabledTime={disabledTime}
						/>
						{hasError && <FormLabelError label={errorMsg} id={errId} />}
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
