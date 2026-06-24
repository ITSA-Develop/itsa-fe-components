import { useEffect, useState } from 'react';
import { Input } from '@/components/Input/Input';
import { EInput } from '@/enums';
import { filterPositiveNumbersOnly, parsePositiveDecimal } from '@/helpers';
import { formatMoneyIfValid, roundStandardDecimal } from '@/helpers/functions';

export interface IMoneyInputCellProps {
	value: any;
	onCommit: (value: any) => void;
	disabled?: boolean;
	min?: number;
	max?: number;
	suffix?: string;
	prefix?: string;
	precision?: number;
	/** Max digits for integer part (before decimal point). */
	maxDigits?: number;
	status?: 'error' | 'warning';
}

const toFormattedDisplay = (value: unknown): string => {
	if (value === null || value === undefined || value === '') return '';
	return formatMoneyIfValid(value);
};

const toRawDisplay = (value: string): string => value.replace(/,/g, '');

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
): number | null => {
	let numValue = parsePositiveDecimal(raw);
	if (numValue === null) return null;

	if (min !== undefined && numValue < min) {
		numValue = min;
	}
	if (max !== undefined && numValue > max) {
		numValue = max;
	}

	return Number(roundStandardDecimal(numValue));
};

export const MoneyInputCell = ({
	value,
	onCommit,
	disabled,
	min,
	max,
	precision = 2,
	suffix,
	prefix,
	maxDigits,
	status,
}: IMoneyInputCellProps) => {
	const [innerValue, setInnerValue] = useState(() => toFormattedDisplay(value));
	const [isDirty, setIsDirty] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!isFocused) {
			setInnerValue(toFormattedDisplay(value));
			setIsDirty(false);
		}
	}, [value, isFocused]);

	const handleFocus = () => {
		setIsFocused(true);
		if (innerValue !== '') {
			setInnerValue(toRawDisplay(innerValue));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const { selectionStart, selectionEnd } = input;
		const cleanValue = filterPositiveNumbersOnly(input.value);

		if (maxDigits !== undefined && cleanValue !== '') {
			const integerPart = cleanValue.split('.')[0] ?? '';
			if (integerPart.replace(/\D/g, '').length > maxDigits) return;
		}

		setInnerValue(cleanValue);
		setIsDirty(true);
		restoreInputSelection(input, selectionStart, selectionEnd);
	};

	const handleBlur = () => {
		setIsFocused(false);

		const rawValue = filterPositiveNumbersOnly(toRawDisplay(innerValue));
		const committedValue = resolveCommitValue(rawValue, min, max);

		if (isDirty) {
			onCommit(committedValue);
		}

		setInnerValue(committedValue === null ? '' : formatMoneyIfValid(committedValue));
		setIsDirty(false);
	};

	return (
		<Input
			type={EInput.text}
			inputMode="decimal"
			value={innerValue}
			onChange={handleChange}
			onFocus={handleFocus}
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
