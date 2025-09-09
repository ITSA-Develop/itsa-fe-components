import { TInputOptions } from '@/types';
import { IEntitySchema, TFieldDisplayType } from '@/types/schema';

export const getDropdownFormattedOptions = (optionValues: Record<any, string>) => {
	return Object.entries(optionValues).map(([key, value]) => ({
		value: key,
		label: value,
	}));
};

export const getFormattedAddress = ({
	principalStreet,
	streetNumber,
	parish,
	canton,
	province,
}: {
	principalStreet: string;
	streetNumber: string;
	parish?: string;
	canton: string;
	province: string;
}): string => {
	const parts = [`${principalStreet} ${streetNumber}`, parish, canton, province];
	return parts.filter(Boolean).join(', ');
};

const formatters: Partial<Record<TFieldDisplayType, (value: any, populateValue?: any) => string>> = {
	text: value => value,
	dropdown: (value, populateValue) =>
		populateValue ? (populateValue.find((populate: any) => populate.value === value)?.label ?? '') : '',
	radio: value => value?.label ?? '',
	currency: value => value,
	checkbox: value => (value ? 'Sí' : 'No'),
};

export const getFormattedFieldValue = (key: TFieldDisplayType, value: any, populateValue: any): string => {
	const formatter = formatters[key];
	return formatter ? formatter(value, populateValue) : String(value);
};

export const getFormattedSchemaValues = (
	elem: Record<string, any>,
	schema: IEntitySchema,
	populate?: Record<string, TInputOptions[]>,
): Record<string, string> => {
	return Object.entries(elem).reduce(
		(acc, [field, value]) => {
			const fieldSchema = schema.fields[field as keyof typeof schema.fields];

			if (fieldSchema) {
				const options = populate?.[field as keyof typeof populate] ?? null;

				acc[field] = getFormattedFieldValue(fieldSchema.type as TFieldDisplayType, value, options);
			}

			return acc;
		},
		{} as Record<string, string>,
	);
};

export const getSchemaColumns = (schema: IEntitySchema): string[] => {
	return Object.values(schema.fields)
		.filter(config => !config.excludeFromColumns)
		.map(config => config.label)
		.filter((label): label is string => typeof label === 'string')
		.concat('actions');
};

export const getSchemaFields = (schema: IEntitySchema): string[] => {
	return Object.entries(schema.fields)
		.filter(([, config]) => !config.excludeFromFields)
		.map(([key]) => key)
		.concat('actions');
};

export const getLabelFromValue = (value: number | string, options: TInputOptions[]): string => {
	const match = options?.find(opt => opt?.value === value);
	return match?.label ?? '';
};


export function getNumberFromStorage(key: string, defaultValue = 0): number {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return defaultValue;

		const num = Number(raw);
		return Number.isNaN(num) ? defaultValue : num;
	} catch {
		return defaultValue;
	}
}

export function getStringFromStorage(key: string, defaultValue = ''): string {
	try {
		const raw = localStorage.getItem(key);
		return raw ?? defaultValue;
	} catch {
		return defaultValue;
	}
}

