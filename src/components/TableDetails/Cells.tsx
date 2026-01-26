import { useCallback, useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { Input } from '@/components/Input/Input';
import { TTextTransform } from '@/types';

export interface ITextInputCellProps {
	value: any;
	onCommit: (value: any) => void;
	textTransform?: TTextTransform;
	disabled?: boolean;
	status?: 'error' | 'warning';
}

export const TextInputCell = ({ value, onCommit, disabled, status, textTransform='uppercase' }: ITextInputCellProps) => {
	const [innerValue, setInnerValue] = useState(value);

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	const normalizedValue = useCallback((value: string) => {
		if (textTransform === 'uppercase') {
			return value.toUpperCase();
		}
		if (textTransform === 'lowercase') {
			return value.toLowerCase();
		}
		return value;
	}, [textTransform]);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setInnerValue(normalizedValue(e.target.value));
	}, [normalizedValue]);

	const handleBlur = useCallback(() => {
		onCommit(normalizedValue(innerValue));
	}, [normalizedValue, innerValue, onCommit]);

	return (
		<Input
			type="text"
			value={innerValue}
			onChange={handleChange}
			onBlur={handleBlur}
			style={{ width: '100%', textTransform: textTransform }}
			disabled={disabled}
			status={status}
		/>
	);
};

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
	const [innerValue, setInnerValue] = useState(value);

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	const handleChange = (val: string | number | null) => {
		if (maxDigits !== undefined && val !== null && val !== undefined) {
			const digits = `${val}`.replace(/\D/g, '');

			if (digits.length > maxDigits) {
				return;
			}
		}

		setInnerValue(val);
	};

	return (
		<InputNumber
			value={innerValue}
			onChange={handleChange}
			onBlur={() => onCommit(innerValue)}
			style={{ width: '100%' }}
			min={min}
			max={max}
			suffix={suffix}
			disabled={disabled}
			prefix={prefix}
			precision={precision}
			status={status}
		/>
	);
};

