import { useEffect, useState } from 'react';
import { Input } from '@/components/Input/Input';
import { EInput } from '@/enums';
import { filterPositiveNumbersOnly, parsePositiveDecimal } from '@/helpers';

export interface INumberInputCellProps {
	value: any;
	onCommit: (value: any) => void;
	disabled?: boolean;
	min?: number;
	max?: number;
	suffix?: string;
	prefix?: string;
	precision?: number;
	maxDigits?: number;
	status?: 'error' | 'warning';
}

const formatDisplayValue = (value: unknown, precision?: number): string => {
	if (value === null || value === undefined || value === '') return '';
	if (typeof value === 'number' && precision !== undefined) {
		return value.toFixed(precision);
	}
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

const resolveCommitValue = (
	raw: string,
	min?: number,
	max?: number,
	precision?: number,
): number | null => {
	let numValue = parsePositiveDecimal(raw);
	if (numValue === null) return null;

	if (min !== undefined && numValue < min) {
		numValue = min;
	}
	if (max !== undefined && numValue > max) {
		numValue = max;
	}
	if (precision !== undefined) {
		numValue = Number(numValue.toFixed(precision));
	}

	return numValue;
};

export const NumberInputCell = ({
	value,
	onCommit,
	disabled,
	min,
	max,
	suffix,
	prefix,
	precision,
	maxDigits,
	status,
}: INumberInputCellProps) => {
	const [innerValue, setInnerValue] = useState(() => formatDisplayValue(value, precision));
	const [isDirty, setIsDirty] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!isFocused) {
			setInnerValue(formatDisplayValue(value, precision));
			setIsDirty(false);
		}
	}, [value, precision, isFocused]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const { selectionStart, selectionEnd } = input;
		const cleanValue = filterPositiveNumbersOnly(input.value);

		if (maxDigits !== undefined && cleanValue !== '') {
			const digits = cleanValue.replace(/\D/g, '');
			if (digits.length > maxDigits) return;
		}

		setInnerValue(cleanValue);
		setIsDirty(true);
		restoreInputSelection(input, selectionStart, selectionEnd);
	};

	const handleBlur = () => {
		setIsFocused(false);
		if (!isDirty) return;

		const committedValue = resolveCommitValue(innerValue, min, max, precision);
		onCommit(committedValue);
		setInnerValue(formatDisplayValue(committedValue, precision));
		setIsDirty(false);
	};

	return (
		<Input
			type={EInput.text}
			inputMode="decimal"
			value={innerValue}
			onChange={handleChange}
			onFocus={() => setIsFocused(true)}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
			style={{ width: '100%' }}
			disabled={disabled}
			suffix={suffix}
			prefix={prefix}
			status={status}
		/>
	);
};
