import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export interface FilterInputDatePickerProps extends Omit<DatePickerProps, 'format' | 'value' | 'onChange' | 'defaultValue'> {
	title?: string;
	defaultValue?: string;
	value?: string;
	format?: string;
	onChange?: (value: string) => void;
}

/**
 * FilterInputDatePicker - Componente de filtro para selección de fechas
 * 
 * Componente de entrada de fecha optimizado para filtros de búsqueda con el mismo diseño
 * que FilterInput. Incluye resaltado visual cuando tiene valor y formateo de fecha configurable.
 * 
 * @component
 * @example
 * ```tsx
 * // Ejemplo básico
 * <FilterInputDatePicker
 *   title="Fecha de inicio"
 *   placeholder="Seleccione fecha"
 *   onChange={(date) => console.log(date)}
 * />
 * 
 * // Con valor controlado
 * <FilterInputDatePicker
 *   title="Fecha de nacimiento"
 *   value={birthDate}
 *   format="DD/MM/YYYY"
 *   onChange={setBirthDate}
 * />
 * 
 * // Con formato personalizado
 * <FilterInputDatePicker
 *   title="Fecha de inicio"
 *   value={startDate}
 *   format="YYYY-MM-DD"
 *   onChange={handleDateChange}
 *   placeholder="YYYY-MM-DD"
 * />
 * ```
 */
export const FilterInputDatePicker = ({
	title,
	defaultValue,
	value,
	format = 'YYYY-MM-DD',
	onChange,
	...rest
}: FilterInputDatePickerProps) => {
	const [internalValue, setInternalValue] = useState<string | undefined>(
		value ?? defaultValue
	);

	const resolvedValue = value ?? internalValue;

	useEffect(() => {
		if (defaultValue) {
			setInternalValue(defaultValue);
		}
	}, [defaultValue]);

	const handleChange = (date: Dayjs | null) => {
		const formattedValue = date ? date.format(format) : '';
		
		if (onChange) {
			onChange(formattedValue);
		}
		
		if (typeof value === 'undefined') {
			setInternalValue(formattedValue);
		}
	};

	const hasValue = resolvedValue && resolvedValue.trim().length > 0;

	const dateValue = resolvedValue && dayjs(resolvedValue, format).isValid() 
		? dayjs(resolvedValue, format) 
		: null;

	return (
		<div className="flex flex-col gap-0">
			<small className="font-bold pl-1">{title}</small>
			<DatePicker
				{...rest}
				className="w-full"
				format={{
					format: format,
					type: 'mask',
				}}
				value={dateValue}
				onChange={handleChange}
				style={{
					height: '27px',
					lineHeight: '18px',
					fontSize: '13px',
					transition: 'box-shadow 160ms ease, border-color 160ms ease',
					boxShadow: hasValue ? '0 0 0 2px rgba(59, 130, 246, 0.15)' : undefined,
					borderColor: hasValue ? '#93c5fd' : undefined,
				}}
			/>
		</div>
	);
};
