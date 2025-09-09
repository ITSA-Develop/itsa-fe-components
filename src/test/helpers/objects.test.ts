import {
	cleanObject,
	createValueLabelMap,
	filterMenuTree,
	findLastChild,
	generateFilteredMenu,
	getMappedOptionFromAPI,
	getMappedOptionFromLocal,
	getNestedValue,
	hasAllRequiredFields,
	mapPermissionsToMenuFormat,
} from '@/helpers/objects';

import type { IMenuItem, IPermissionSubmodule } from '@/interfaces';
import type { TInputOptions } from '@/types';

vi.mock('@/utils/constants', () => ({
	ICON_MAP: {
		icon1: 'icon1-mock',
		icon2: 'icon2-mock',
	},
}));

vi.mock('../strings', () => ({
	toTitleCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
}));

describe('Utils Objects functions - tests', () => {
	describe('cleanObject', () => {
		it('removes empty values recursively', () => {
			const input = {
				a: '',
				b: null,
				c: {
					d: 0,
					e: undefined,
					f: {
						g: '',
						h: 'value',
					},
				},
			};
			expect(cleanObject(input)).toEqual({ c: { d: 0, f: { h: 'value' } } });
		});

		it('returns the value if it is not an object', () => {
			expect(cleanObject(null)).toBe(null);
			expect(cleanObject(123)).toBe(123);
			expect(cleanObject('test')).toBe('test');
		});
	});

	describe('getMappedOptionFromLocal', () => {
		const options = { a: 'Alpha', b: 'Beta' };

		it('returns label and value when value exists in options', () => {
			expect(getMappedOptionFromLocal('a', options)).toEqual({ value: 'a', label: 'Alpha' });
		});

		it('returns label equal to value when value is not in options', () => {
			expect(getMappedOptionFromLocal('c', options)).toEqual({ value: 'c', label: 'c' });
		});

		it('returns empty when value is null or undefined', () => {
			expect(getMappedOptionFromLocal(null, options)).toEqual({ value: '', label: '' });
			expect(getMappedOptionFromLocal(undefined, options)).toEqual({ value: '', label: '' });
		});
	});

	describe('createValueLabelMap', () => {
		const options: TInputOptions[] = [
			{ value: 'x', label: 'X Label' },
			{ value: 'y', label: 'Y Label' },
		];
		it('creates a value-label object correctly', () => {
			expect(createValueLabelMap(options)).toEqual({ x: 'X Label', y: 'Y Label' });
		});

		it('returns empty object for empty array', () => {
			expect(createValueLabelMap([])).toEqual({});
		});
	});

	describe('getMappedOptionFromAPI', () => {
		const options: TInputOptions[] = [
			{ value: '1', label: 'One' },
			{ value: '2', label: 'Two' },
		];

		it('returns option with found label', () => {
			expect(getMappedOptionFromAPI('1', options)).toEqual({ value: '1', label: 'One' });
		});

		it('returns empty option if value does not exist or is falsy', () => {
			expect(getMappedOptionFromAPI('3', options)).toEqual({ value: '', label: '' });
			expect(getMappedOptionFromAPI(null, options)).toEqual({ value: '', label: '' });
			expect(getMappedOptionFromAPI(undefined, options)).toEqual({ value: '', label: '' });
			expect(getMappedOptionFromAPI(0, options)).toEqual({ value: '', label: '' });
		});
	});

	describe('mapPermissionsToMenuFormat', () => {
		const subModules: IPermissionSubmodule[] = [
			{
				id: 1,
				name: 'module1',
				icon: 'icon1',
				path: '/mod1',
				groups: [
					{
						id: 11,
						name: 'group1',
						icon: 'icon1',
						path: '/grp1',
						programs: [
							{
								id: 111,
								name: 'program1',
								icon: 'icon1',
								path: '/prog1',
								actions: { update: 0, delete: 0, create: 0, read: 0, all_actions: 0 },
							},
						],
						actions: { update: 0, delete: 0, create: 0, read: 0, all_actions: 0 },
					},
				],
				programs: [
					{
						id: 112,
						name: 'program2',
						icon: 'icon2',
						path: '/prog2',
						actions: { update: 0, delete: 0, create: 0, read: 0, all_actions: 0 },
					},
				],
			},
		];

		it('correctly maps permissions to menu format', () => {
			const result = mapPermissionsToMenuFormat(subModules);
			expect(result).toHaveLength(1);
			expect(result[0]).toBeDefined();
		});
	});

	describe('filterMenuTree', () => {
		const menu: IMenuItem[] = [
			{
				id: 1,
				name: 'root',
				title: 'Root Node',
				icon: 'icon1-mock',
				path: '/',
				subList: [
					{ id: 11, name: 'child1', title: 'Child One', icon: 'icon2-mock', path: '/c1', subList: [] },
					{ id: 12, name: 'child2', title: 'Child Two', icon: 'icon2-mock', path: '/c2', subList: [] },
				],
			},
		];

		it('filters by search term (accent and case insensitive)', () => {
			const filtered = filterMenuTree(menu, 'child one');
			expect(filtered.length).toBe(1);
		});

		it('returns empty if no matches found', () => {
			const filtered = filterMenuTree(menu, 'nomatch');
			expect(filtered.length).toBe(0);
		});
	});

	describe('generateFilteredMenu', () => {
		it('returns empty array if subModules is undefined', () => {
			expect(generateFilteredMenu(undefined, 'test')).toEqual([]);
		});

		it('returns full menu if searchTerm is empty', () => {
			const subModules = [{ id: 'm1', name: 'mod1', icon: 'icon1', path: '/', groups: [], programs: [] }] as any;
			const result = generateFilteredMenu(subModules, '');
			expect(result.length).toBe(1);
		});

		it('returns filtered menu if searchTerm has text', () => {
			const subModules = [
				{
					id: 'm1',
					name: 'mod1',
					icon: 'icon1',
					path: '/',
					groups: [],
					programs: [],
				},
			] as any;
			const result = generateFilteredMenu(subModules, 'mod1');
			expect(result.length).toBe(1);
		});
	});

	describe('hasAllRequiredFields', () => {
		it('returns true only if all required fields have valid values', () => {
			const values = {
				a: 'text',
				b: [1],
				c: 'not empty',
			};

			const required = ['a', 'b'];

			expect(hasAllRequiredFields(values, required)).toBe(true);
			expect(hasAllRequiredFields({ a: '', b: [1] }, required)).toBe(false);
			expect(hasAllRequiredFields({ a: 'x', b: [] }, required)).toBe(false);
			expect(hasAllRequiredFields({ a: 'x' }, required)).toBe(false);
		});
	});

	describe('findLastChild', () => {
		it('returns the tree if node is not found', () => {
			const tree = { a: { b: {} } };
			expect(findLastChild(tree, 'nope')).toEqual(tree);
		});

		it('searches recursively until the last child', () => {
			const tree = {
				node1: {
					node1: {
						node1: 'last',
					},
				},
			};

			expect(findLastChild(tree, 'node1')).toEqual('last');
		});
	});

	describe('getNestedValue', () => {
		const obj = {
			a: {
				b: {
					c: 123,
					d: null,
				},
			},
		};

		it('returns nested value when exists', () => {
			expect(getNestedValue(obj, 'a.b.c')).toBe(123);
			expect(getNestedValue(obj, ['a', 'b', 'c'])).toBe(123);
		});

		it('returns default value when not found', () => {
			expect(getNestedValue(obj, 'a.b.x', 'default')).toBe('default');
			expect(getNestedValue(obj, 'a.x.c', 0)).toBe(0);
		});

		it('returns undefined if value does not exist and no default provided', () => {
			expect(getNestedValue(obj, 'a.b.x')).toBeUndefined();
		});
	});
});
