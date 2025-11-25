import { Select, SelectProps } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Spin } from 'antd';
import { Avatar } from 'antd';

export interface DebounceSelectProps<ValueType = any>
	extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
	fetchOptions: (search: string) => Promise<ValueType[]>;
	debounceTimeout?: number;
}

function DebounceSelect<
	ValueType extends {
		key?: string;
		label: React.ReactNode;
		value: string | number;
		avatar?: string;
	} = any,
>({ fetchOptions, debounceTimeout = 300, ...props }: DebounceSelectProps<ValueType>) {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState<ValueType[]>([]);
	const fetchRef = useRef(0);

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value: string) => {
			fetchRef.current += 1;
			const fetchId = fetchRef.current;
			setOptions([]);
			setFetching(true);

			fetchOptions(value).then(newOptions => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return;
				}

				setOptions(newOptions);
				setFetching(false);
			});
		};

		return debounce(loadOptions, debounceTimeout);
	}, [fetchOptions, debounceTimeout]);

	return (
		<Select
			labelInValue
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small" /> : 'No results found'}
			{...props}
			options={options}
			optionRender={option => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{option.data.avatar && <Avatar src={option.data.avatar} style={{ marginRight: 8 }} />}
					{option.label}
				</div>
			)}
		/>
	);
}

// async function fetchUserList(username: string): Promise<any[]> {
// 	console.log('fetching user', username);
// 	return fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?search=${username}`)
// 		.then(res => res.json())
// 		.then(res => {
// 			const results = Array.isArray(res) ? res : [];
// 			return results.map(user => ({
// 				label: user.name,
// 				value: user.id,
// 				avatar: user.avatar,
// 			}));
// 		});
// }

export interface FormSelectorDebounceProps {
	mode?: 'multiple' | 'tags';
	placeholder?: string;
	fetchOptions: (search: string) => Promise<any[]>;
}

export const FormSelectorDebounce = ({ mode, placeholder, fetchOptions }: FormSelectorDebounceProps) => {
	const [value, setValue] = useState<any[]>([]);

	return (
		<DebounceSelect
			mode={mode}
			value={value}
			placeholder={placeholder}
			fetchOptions={fetchOptions}
			style={{ width: '100%' }}
			onChange={newValue => {
				if (Array.isArray(newValue)) {
					setValue(newValue);
				}
			}}
		/>
	);
};