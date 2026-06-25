import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { Input } from '@/components/Input/Input';
import { TTextTransform } from '@/types';

export interface ITextInputCellProps {
	value: any;
	onCommit: (value: any) => void;
	textTransform?: TTextTransform;
	disabled?: boolean;
	status?: 'error' | 'warning';
}

export const TextInputCell = ({
	value,
	onCommit,
	disabled,
	status,
	textTransform = 'uppercase',
}: ITextInputCellProps) => {
	const [innerValue, setInnerValue] = useState(value);
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		setInnerValue(value);
		setIsDirty(false);
	}, [value]);

	const normalizedValue = useCallback(
		(value: string) => {
			if (textTransform === 'uppercase') return value.toUpperCase();
			if (textTransform === 'lowercase') return value.toLowerCase();
			return value;
		},
		[textTransform],
	);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setInnerValue(normalizedValue(e.target.value));
			setIsDirty(true);
		},
		[normalizedValue],
	);

	const handleBlur = useCallback(() => {
		if (!isDirty) return;

		onCommit(normalizedValue(innerValue));
		setIsDirty(false);
	}, [isDirty, normalizedValue, innerValue, onCommit]);

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
