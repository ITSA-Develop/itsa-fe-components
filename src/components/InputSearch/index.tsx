import React, { useEffect, useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, InputProps, Spin } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface InputSearchProps extends InputProps {
	type: string;
	defaultValue?: string;
	ref?: RefCallBack;
	loading?: boolean;
	enterButton?: boolean;
	onSearch?: (value: string) => void;
}

export const InputSearch = ({ ref, type, defaultValue, loading, onSearch, ...rest }: InputSearchProps) => {
	const initRef = useRef<boolean>(false);
	const [internalValue, setInternalValue] = useState<string>(
		typeof (rest as any).value === 'string'
			? ((rest as any).value as string)
			: typeof defaultValue === 'string'
				? (defaultValue as string)
				: '',
	);

	const resolvedValue = (rest as any).value ?? internalValue;

	useEffect(() => {
		if (initRef.current) return;

		// If the component is uncontrolled, keep internal state in sync with defaultValue changes
		// if (typeof (rest as any).value === 'undefined') {
		// 	setInternalValue(typeof defaultValue === 'string' ? (defaultValue as string) : '');
		// 	initRef.current = true;
		// }
		if(defaultValue){
			setInternalValue(defaultValue);
			initRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue]);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		const value = e.target.value;
		if (rest.onChange) rest.onChange(e);
		if (typeof (rest as any).value === 'undefined') {
			setInternalValue(value);
		}
		if (onSearch) onSearch(value);
	};

	const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = e => {
		if (rest.onPressEnter) rest.onPressEnter(e);
		const value = (e.currentTarget as HTMLInputElement).value;
		if (onSearch) onSearch(value);
	};

	const showLoading = !!loading;

	// Keep a stable suffix node to avoid Input focus loss when toggling loading state
	const mergedSuffix = (
		<span className="itsa-inputsearch-suffix" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
			<span style={{ visibility: showLoading ? 'visible' : 'hidden', display: 'inline-flex' }}>
				<Spin indicator={<LoadingOutlined spin className="text-gray-400" />} />
			</span>
			<span style={{ visibility: showLoading ? 'hidden' : 'visible', display: 'inline-flex' }}>{rest.suffix}</span>
		</span>
	);

	return (
		<Input
			{...rest}
			ref={ref}
			type={type}
			value={resolvedValue}
			onChange={handleChange}
			onPressEnter={handlePressEnter}
			suffix={mergedSuffix}
		/>
	);
};
