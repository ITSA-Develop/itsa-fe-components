import { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { Input } from '@/components/Input/Input';

export const TextInputCell = ({
	value,
	onCommit,
	disabled,
}: {
	value: any;
	onCommit: (value: any) => void;
	disabled?: boolean;
}) => {
	const [innerValue, setInnerValue] = useState(value);

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	return (
		<Input
			type="text"
			value={innerValue}
			onChange={e => setInnerValue(e.target.value)}
			onBlur={() => onCommit(innerValue)}
			style={{ width: '100%' }}
			disabled={disabled}
		/>
	);
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
}: {
	value: any;
	onCommit: (value: any) => void;
	disabled?: boolean;
	min?: number;
	max?: number;
	suffix?: string;
	prefix?: string;
	precision?: number;
}) => {
	const [innerValue, setInnerValue] = useState(value);

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	return (
		<InputNumber
			value={innerValue}
			onChange={val => setInnerValue(val)}
			onBlur={() => onCommit(innerValue)}
			style={{ width: '100%' }}
			min={min}
			max={max}
			suffix={suffix}
			disabled={disabled}
			prefix={prefix}
			precision={precision}
		/>
	);
};

