import { Select, SelectProps } from "antd";
import { filterOptions } from "@/helpers/filterOptions";

export interface IFilterSelectProps extends SelectProps {
	label: string;
}

type AnyOption = { value: unknown; options?: AnyOption[] };

// Recorre options (incluye grupos con sub-options) y verifica si el value existe
const valueExistsInOptions = (val: unknown, options?: AnyOption[]): boolean => {
	if (!options || options.length === 0) return false;
	for (const opt of options) {
		if (!opt) continue;
		if (Array.isArray(opt.options)) {
			if (valueExistsInOptions(val, opt.options)) return true;
		} else if (opt.value === val) {
			return true;
		}
	}
	return false;
};

export const FilterSelect = ({
	label,
	showSearch,
	filterOption,
	...rest
}: IFilterSelectProps) => {
	const restAny = rest as any;
	const options: AnyOption[] | undefined = restAny.options;

	// Con showSearch activo, usa filterOptions de la librería salvo que se pase filterOption custom.
	const resolvedFilterOption = showSearch ? (filterOption ?? filterOptions) : filterOption;

	// Sanea el value: si no existe en options, lo convierte en undefined
	// para que el Select muestre el placeholder en lugar del valor "crudo".
	const sanitizeValue = (val: unknown): unknown => {
		if (val === undefined || val === null) return undefined;

		if (Array.isArray(val)) {
			const filtered = val.filter((v) => {
				const realV = v && typeof v === 'object' && 'value' in v ? (v as any).value : v;
				return valueExistsInOptions(realV, options);
			});
			return filtered.length > 0 ? filtered : undefined;
		}

		if (typeof val === 'object' && 'value' in (val as any)) {
			return valueExistsInOptions((val as any).value, options) ? val : undefined;
		}

		return valueExistsInOptions(val, options) ? val : undefined;
	};

	// Solo saneamos si hay options definidas (modo controlado típico).
	// Si el consumidor usa <Option> como children, dejamos el value tal cual.
	const hasOptionsProp = Array.isArray(options);
	const safeValue = hasOptionsProp ? sanitizeValue(restAny.value) : restAny.value;
	const safeDefaultValue = hasOptionsProp ? sanitizeValue(restAny.defaultValue) : restAny.defaultValue;

	const rawValue = safeValue ?? safeDefaultValue;
	let hasValue = false;
	if (Array.isArray(rawValue)) {
		hasValue = rawValue.length > 0;
	} else if (rawValue && typeof rawValue === 'object' && 'value' in (rawValue as any)) {
		const objectValue = (rawValue as { value?: unknown }).value;
		hasValue = objectValue !== undefined && objectValue !== null && objectValue !== '';
	} else if (typeof rawValue === 'string') {
		hasValue = rawValue.trim().length > 0;
	} else if (typeof rawValue === 'number') {
		hasValue = true;
	} else {
		hasValue = !!rawValue;
	}

	const shouldHighlight = hasValue;
	const mergedRootClassName = [
		'itsa-filter-select',
		restAny.rootClassName,
		shouldHighlight ? 'itsa-select-has-value' : undefined,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className="flex flex-col gap-0">
			<small className="font-bold flex-1 min-w-0 truncate">
				{label}
			</small>
			<Select
				{...rest}
				showSearch={showSearch}
				filterOption={resolvedFilterOption}
				value={safeValue}
				defaultValue={safeDefaultValue}
				status={undefined}
				rootClassName={mergedRootClassName || undefined}
				className={restAny.className}
				style={{
					height: '27px',
					lineHeight: '18px',
					fontSize: '13px',
					...(restAny.style ?? {}),
				}}
			/>
		</div>
	);
};
