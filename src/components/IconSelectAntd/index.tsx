import { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import type { IIconOption } from '@/constants/iconOptions';
import { ICON_OPTIONS } from '@/constants/iconOptions';

export interface IconSelectAntdProps {
	options?: IIconOption[];
	value?: string | null;
	onChange?: (option: IIconOption | null) => void;
	placeholder?: string;
	allowClear?: boolean;
	className?: string;
}

export const IconSelectAntd = ({
	options = ICON_OPTIONS,
	value,
	onChange,
	placeholder = 'Buscar icono...',
	allowClear = true,
	className,
}: IconSelectAntdProps) => {
	const [internalValue, setInternalValue] = useState<string | null>(value ?? null);

	useEffect(() => {
		if (typeof value !== 'undefined') {
			setInternalValue(value);
		}
	}, [value]);

	const selectOptions = useMemo(
		() =>
			options.map(opt => ({
				label: (
					<div className="flex items-center gap-2">
						<span className="text-xl">{opt.value}</span>
						<span>{opt.label}</span>
					</div>
				),
				value: opt.label, // unique key by label name
				searchText: opt.label, // used for filtering
			})),
		[options],
	);

	const resolvedValue = typeof value === 'undefined' ? internalValue ?? undefined : value ?? undefined;

	const handleChange = (nextValue: string | undefined) => {
		const selectedLabel = nextValue ?? null;
		if (typeof value === 'undefined') {
			setInternalValue(selectedLabel);
		}
		if (onChange) {
			const found = options.find(o => o.label === (selectedLabel ?? ''));
			onChange(found ?? null);
		}
	};

	return (
		<Select
			className={className}
			showSearch
			allowClear={allowClear}
			placeholder={placeholder}
			options={selectOptions}
			optionFilterProp="searchText"
			filterOption={(input, option) =>
				(option as any)?.searchText?.toLowerCase().includes(input.toLowerCase())
			}
			optionLabelProp="label"
			value={resolvedValue}
			onChange={handleChange}
		/>
	);
};


