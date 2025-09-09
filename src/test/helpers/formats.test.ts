import {
	getDropdownFormattedOptions,
	getFormattedAddress,
	getFormattedFieldValue,
	getFormattedSchemaValues,
	getLabelFromValue,
	getSchemaColumns,
	getSchemaFields,
} from '@/helpers/formats';
import type { TInputOptions } from '@/types';
import type { IEntitySchema, TFieldDisplayType } from '@/types/schema';

describe('Utility functions', () => {
	describe('getDropdownFormattedOptions', () => {
		it('converts an object into an array with value and label', () => {
			const input = { a: 'Option A', b: 'Option B' };
			expect(getDropdownFormattedOptions(input)).toEqual([
				{ value: 'a', label: 'Option A' },
				{ value: 'b', label: 'Option B' },
			]);
		});

		it('works with an empty object', () => {
			expect(getDropdownFormattedOptions({})).toEqual([]);
		});
	});

	describe('getFormattedAddress', () => {
		it('concatenates non-empty parts separated by commas', () => {
			const address = getFormattedAddress({
				principalStreet: 'Main St',
				streetNumber: '123',
				parish: 'Central Parish',
				canton: 'CantonX',
				province: 'ProvinceY',
			});
			expect(address).toBe('Main St 123, Central Parish, CantonX, ProvinceY');
		});

		it('omits optional undefined or empty values', () => {
			const address = getFormattedAddress({
				principalStreet: 'Main St',
				streetNumber: '123',
				parish: undefined,
				canton: 'CantonX',
				province: 'ProvinceY',
			});
			expect(address).toBe('Main St 123, CantonX, ProvinceY');
		});
	});

	describe('getFormattedFieldValue', () => {
		it('uses the correct formatter according to type', () => {
			expect(getFormattedFieldValue('text', 'hello', null)).toBe('hello');
			expect(getFormattedFieldValue('checkbox', true, null)).toBe('Sí');
			expect(getFormattedFieldValue('checkbox', false, null)).toBe('No');

			const options = [
				{ value: '1', label: 'One' },
				{ value: '2', label: 'Two' },
			];

			expect(getFormattedFieldValue('dropdown', '2', options)).toBe('Two');
			expect(getFormattedFieldValue('dropdown', '3', options)).toBe('');
			expect(getFormattedFieldValue('radio', { label: 'Selected' }, null)).toBe('Selected');
			expect(getFormattedFieldValue('radio', null, null)).toBe('');
		});

		it('converts to string if no formatter exists', () => {
			expect(getFormattedFieldValue('unknown' as TFieldDisplayType, 123, null)).toBe('123');
			expect(getFormattedFieldValue('unknown' as TFieldDisplayType, null, null)).toBe('null');
		});
	});

	describe('getFormattedSchemaValues', () => {
		const schema: IEntitySchema = {
			fields: {
				name: { type: 'text', label: 'Name' },
				active: { type: 'checkbox', label: 'Active' },
				choice: { type: 'dropdown', label: 'Choice' },
			},
		} as any;

		const elem = {
			name: 'John',
			active: true,
			choice: 'b',
			ignoredField: 'ignore me',
		};

		const populate = {
			choice: [
				{ value: 'a', label: 'Option A' },
				{ value: 'b', label: 'Option B' },
			],
		};

		it('formats only the fields defined in the schema', () => {
			const formatted = getFormattedSchemaValues(elem, schema, populate);
			expect(formatted).toEqual({
				name: 'John',
				active: 'Sí',
				choice: 'Option B',
			});
			expect(formatted).not.toHaveProperty('ignoredField');
		});
	});

	describe('getSchemaColumns', () => {
		it('returns non-excluded labels plus "actions"', () => {
			const schema: IEntitySchema = {
				fields: {
					a: { label: 'Label A' },
					b: { label: 'Label B', excludeFromColumns: true },
					c: { label: 'Label C' },
					d: { excludeFromColumns: true },
				},
			} as any;

			const cols = getSchemaColumns(schema);
			expect(cols).toEqual(['Label A', 'Label C', 'actions']);
		});
	});

	describe('getSchemaFields', () => {
		it('returns non-excluded keys plus "actions"', () => {
			const schema: IEntitySchema = {
				fields: {
					a: { excludeFromFields: true },
					b: {},
					c: {},
				},
			} as any;

			const fields = getSchemaFields(schema);
			expect(fields).toEqual(['b', 'c', 'actions']);
		});
	});

	describe('getLabelFromValue', () => {
		const options: TInputOptions[] = [
			{ value: 'x', label: 'Option X' },
			{ value: 1, label: 'Option 1' },
		];

		it('returns the corresponding label', () => {
			expect(getLabelFromValue('x', options)).toBe('Option X');
			expect(getLabelFromValue(1, options)).toBe('Option 1');
		});

		it('returns "" if no match is found', () => {
			expect(getLabelFromValue('y', options)).toBe('');
			expect(getLabelFromValue(2, options)).toBe('');
		});
	});
});
