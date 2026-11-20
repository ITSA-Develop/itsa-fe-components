import { Select } from 'antd';
import { DynamicIcon, iconNames, type IconName } from 'lucide-react/dynamic';
import { memo, useId, useMemo, useState } from 'react';
import { Control, Controller, FieldValues, Path, type RefCallBack } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';

const MAX_RESULTS = 48;

const FEATURED_ICON_NAMES = [
	'house',
	'user',
	'users',
	'settings',
	'search',
	'bell',
	'calendar',
	'mail',
	'phone',
	'map-pin',
	'shopping-cart',
	'package',
	'truck',
	'file-text',
	'folder',
	'image',
	'camera',
	'heart',
	'star',
	'circle-check',
	'pencil',
	'trash-2',
	'download',
	'upload',
	'eye',
	'lock',
	'key',
	'menu',
	'layout-dashboard',
	'chart-column',
	'wallet',
	'credit-card',
	'building-2',
	'store',
	'car',
	'wrench',
	'info',
	'clock',
	'tag',
	'filter',
	'list',
	'bookmark',
	'share-2',
	'printer',
	'copy',
	'link',
	'globe',
	'smartphone',
] as const satisfies readonly IconName[];

const featuredIconNames: readonly IconName[] = FEATURED_ICON_NAMES;

const isLucideIconName = (value: unknown): value is IconName =>
	typeof value === 'string' && (iconNames as readonly string[]).includes(value);

const LucideIconLabel = ({ name, size = 18 }: { name: IconName; size?: number }) => (
	<span className="flex min-w-0 items-center gap-2">
		<span className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-700">
			<DynamicIcon
				name={name}
				size={size}
				strokeWidth={1.75}
				fallback={() => <span className="block h-4 w-4 rounded-sm bg-gray-200" />}
			/>
		</span>
		<span className="truncate" title={name}>
			{name}
		</span>
	</span>
);

export interface IFormIconSelectorProps<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>;
	label: string;
	control: Control<TFieldValues>;
	placeholder?: string;
	allowClear?: boolean;
	disabled?: boolean;
}

const FormIconSelectorField = ({
	fieldValue,
	onChange,
	onBlur,
	inputRef,
	errorMsg,
	id,
	errId,
	placeholder,
	allowClear,
	disabled,
}: {
	fieldValue: unknown;
	onChange: (value: string | null) => void;
	onBlur: () => void;
	inputRef: RefCallBack;
	errorMsg?: string;
	id: string;
	errId: string;
	placeholder: string;
	allowClear: boolean;
	disabled: boolean;
}) => {
	const [query, setQuery] = useState('');

	const { visibleNames, matchCount } = useMemo(() => {
		const normalized = query.trim().toLowerCase();

		if (!normalized) {
			return {
				visibleNames: featuredIconNames,
				matchCount: iconNames.length,
			};
		}

		const matches = iconNames.filter(name => name.includes(normalized));
		matches.sort((left, right) => {
			const leftStarts = left.startsWith(normalized) ? 0 : 1;
			const rightStarts = right.startsWith(normalized) ? 0 : 1;
			if (leftStarts !== rightStarts) return leftStarts - rightStarts;
			return left.localeCompare(right);
		});

		return {
			visibleNames: matches.slice(0, MAX_RESULTS),
			matchCount: matches.length,
		};
	}, [query]);

	const options = useMemo(
		() => visibleNames.map(name => ({ label: name, value: name })),
		[visibleNames],
	);

	const selectedName = isLucideIconName(fieldValue) ? fieldValue : undefined;

	const resultHint =
		query.trim().length === 0
			? `Iconos frecuentes. Escriba para buscar entre ${matchCount} iconos.`
			: matchCount === 0
				? 'No hay iconos con ese nombre.'
				: `Mostrando ${visibleNames.length} de ${matchCount}.`;

	return (
		<Select
			id={id}
			ref={inputRef}
			className="w-full rounded-lg"
			showSearch
			allowClear={allowClear}
			disabled={disabled}
			virtual={false}
			listHeight={320}
			placeholder={placeholder}
			status={errorMsg !== undefined ? 'error' : undefined}
			aria-invalid={errorMsg !== undefined}
			aria-describedby={errorMsg !== undefined ? errId : undefined}
			value={selectedName}
			options={options}
			searchValue={query}
			filterOption={false}
			notFoundContent="No hay iconos con ese nombre."
			optionRender={option => <LucideIconLabel name={option.value as IconName} />}
			labelRender={({ value }) =>
				isLucideIconName(value) ? <LucideIconLabel name={value} size={16} /> : null
			}
			popupRender={menu => (
				<div>
					<div className="border-b border-gray-100 px-3 py-2 text-xs text-gray-500">{resultHint}</div>
					{menu}
				</div>
			)}
			onSearch={setQuery}
			onOpenChange={open => {
				if (!open) setQuery('');
			}}
			onChange={value => onChange(value ?? null)}
			onBlur={onBlur}
		/>
	);
};

const FormIconSelectorComponent = <TFieldValues extends FieldValues>({
	name,
	label,
	control,
	placeholder,
	allowClear = true,
	disabled = false,
}: IFormIconSelectorProps<TFieldValues>) => {
	const id = useId();
	const errId = `${id}-error`;

	const placeholderText = useMemo(() => {
		if (placeholder !== undefined && placeholder.trim().length > 0) {
			return placeholder.toUpperCase();
		}
		return 'Seleccione un icono';
	}, [placeholder]);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;

				return (
					<div className="flex flex-col gap-0.5">
						<FormLabel label={label} htmlFor={id} />
						<FormIconSelectorField
							fieldValue={field.value}
							onChange={field.onChange}
							onBlur={field.onBlur}
							inputRef={field.ref}
							errorMsg={errorMsg}
							id={id}
							errId={errId}
							placeholder={placeholderText}
							allowClear={allowClear}
							disabled={disabled}
						/>
						{errorMsg !== undefined && <FormLabelError label={errorMsg} id={errId} />}
					</div>
				);
			}}
		/>
	);
};

export const FormIconSelector = memo(FormIconSelectorComponent) as typeof FormIconSelectorComponent & {
	displayName?: string;
};

FormIconSelector.displayName = 'FormIconSelector';
