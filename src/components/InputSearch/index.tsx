import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, InputProps, Spin } from 'antd';
import { RefCallBack } from 'react-hook-form';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';

export interface InputSearchProps extends InputProps {
	type: string;
    defaultValue?: string;
	ref?: RefCallBack;
	loading?: boolean;
	enterButton?: boolean;
	onSearch?: (value: string) => void;
	debounceDelay?: number;
	debounceLeading?: boolean;
	debounceTrailing?: boolean;
	enableLoading?: boolean;
}

export const InputSearch = ({
	ref,
	type,
    defaultValue,
	loading,
	onSearch,
	debounceDelay = 600,
	debounceLeading = false,
	debounceTrailing = true,
	enableLoading = false,
	...rest
}: InputSearchProps) => {
	const [internalValue, setInternalValue] = useState<string>(
		typeof (rest as any).value === 'string'
			? ((rest as any).value as string)
			: typeof defaultValue === 'string'
				? (defaultValue as string)
				: '',
	);

	const { debouncedCallback, isLoading } = useDebouncedCallback(
		(val: string) => {
			if (onSearch) onSearch(val);
		},
		debounceDelay,
		{ leading: debounceLeading, trailing: debounceTrailing, enableLoading },
	);

	const resolvedValue = (rest as any).value ?? internalValue;

	useEffect(() => {
		// If the component is uncontrolled, keep internal state in sync with defaultValue changes
		if (typeof (rest as any).value === 'undefined') {
			setInternalValue(
				typeof defaultValue === 'string' ? (defaultValue as string) : '',
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue]);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const value = e.target.value;
		setInternalValue(value);
		if (rest.onChange) rest.onChange(e);
		debouncedCallback(value as any);
	};

	const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
		if (rest.onPressEnter) rest.onPressEnter(e);
		const value = (e.currentTarget as HTMLInputElement).value;
		if (onSearch) onSearch(value);
	};

	const suffix = (typeof loading === 'boolean' ? loading : enableLoading && isLoading) ? (
		<Spin indicator={<LoadingOutlined spin className="text-gray-400" />} />
	) : (
		rest.suffix
	);

	return (
		<Input
			{...rest}
			ref={ref}
			type={type}
			value={resolvedValue}
			onChange={handleChange}
			onPressEnter={handlePressEnter}
			suffix={suffix}
		/>
	);
};
