import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/Input/Input';
import type { IIconOption } from '@/constants/iconOptions';
import { ICON_OPTIONS } from '@/constants/iconOptions';

export interface IconosProps {
	options?: IIconOption[];
	value?: string | null;
	onChange?: (option: IIconOption | null) => void;
	placeholder?: string;
	columns?: number;
	className?: string;
}

export const Iconos = ({
	options = ICON_OPTIONS,
	value,
	onChange,
	placeholder = 'Buscar icono...',
	columns = 6,
	className,
}: IconosProps) => {
	const [query, setQuery] = useState<string>('');
	const [internalValue, setInternalValue] = useState<string | null>(value ?? null);

	useEffect(() => {
		if (typeof value !== 'undefined') {
			setInternalValue(value);
		}
	}, [value]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return options;
		return options.filter(opt => opt.label.toLowerCase().includes(q));
	}, [options, query]);

	const resolvedValue = typeof value === 'undefined' ? internalValue : value;

	const handleSelect = (opt: IIconOption) => {
		if (typeof value === 'undefined') {
			setInternalValue(opt.label);
		}
		if (onChange) onChange(opt);
	};

	const handleClear = () => {
		if (typeof value === 'undefined') {
			setInternalValue(null);
		}
		if (onChange) onChange?.(null);
	};

	return (
		<div className={className}>
			<div className="flex items-center gap-2 mb-2">
				<Input
					type="text"
					placeholder={placeholder}
					value={query}
					onChange={e => setQuery((e.target as HTMLInputElement).value)}
				/>
				<button
					type="button"
					onClick={handleClear}
					className="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
				>
					Limpiar
				</button>
			</div>
			<div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
				{filtered.map(opt => {
					const isSelected = resolvedValue === opt.label;
					return (
						<button
							type="button"
							key={opt.label}
							onClick={() => handleSelect(opt)}
							className={[
								'flex flex-col items-center justify-center gap-1 p-2 rounded-md border transition-colors',
								'hover:bg-gray-50',
								isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
							].join(' ')}
							title={opt.label}
						>
							<span className="text-xl">{opt.value}</span>
							<span className="text-[11px] text-gray-600 truncate w-full">{opt.label}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};
