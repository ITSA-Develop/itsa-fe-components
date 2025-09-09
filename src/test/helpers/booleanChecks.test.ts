import {
	isArray,
	isEmpty,
	isNumber,
	isObject,
	isPlainObject,
	isString,
	isUndefined,
	isValidEmailFormat,
	isValidMaskFormat,
} from '@/helpers/booleansChecks';

describe('Utils type-check and validation functions', () => {
	describe('isArray', () => {
		it('returns true for arrays', () => {
			expect(isArray([1, 2, 3])).toBe(true);
			expect(isArray([])).toBe(true);
			expect(isArray(['a', 'b'])).toBe(true);
		});
		it('returns false for non-arrays', () => {
			expect(isArray({})).toBe(false);
			expect(isArray('string')).toBe(false);
			expect(isArray(123)).toBe(false);
			expect(isArray(null)).toBe(false);
			expect(isArray(undefined)).toBe(false);
		});
	});

	describe('isValidEmailFormat', () => {
		it('returns false if email is undefined or empty', () => {
			expect(isValidEmailFormat()).toBe(false);
			expect(isValidEmailFormat('')).toBe(false);
		});
		it('returns true for valid email formats', () => {
			expect(isValidEmailFormat('test@example.com')).toBe(true);
			expect(isValidEmailFormat('user.name+tag+sorting@example.com')).toBe(true);
		});
		it('returns false for invalid email formats', () => {
			expect(isValidEmailFormat('plainaddress')).toBe(false);
			expect(isValidEmailFormat('@@example.com')).toBe(false);
			expect(isValidEmailFormat('email.example.com')).toBe(false);
		});
	});

	describe('isEmpty', () => {
		it('returns true for null or undefined', () => {
			expect(isEmpty(null)).toBe(true);
			expect(isEmpty(undefined)).toBe(true);
		});
		it('returns true for empty strings', () => {
			expect(isEmpty('')).toBe(true);
			expect(isEmpty('   ')).toBe(true);
		});
		it('returns true for empty arrays', () => {
			expect(isEmpty([])).toBe(true);
		});
		it('returns true for empty Map or Set', () => {
			expect(isEmpty(new Map())).toBe(true);
			expect(isEmpty(new Set())).toBe(true);
		});
		it('returns true for plain empty objects', () => {
			expect(isEmpty({})).toBe(true);
			expect(isEmpty(Object.create(null))).toBe(true);
		});
		it('returns false for non-empty strings, arrays, maps, sets, objects', () => {
			expect(isEmpty('abc')).toBe(false);
			expect(isEmpty([1])).toBe(false);
			const map = new Map();
			map.set('key', 'value');
			expect(isEmpty(map)).toBe(false);
			const set = new Set();
			set.add(1);
			expect(isEmpty(set)).toBe(false);
			expect(isEmpty({ a: 1 })).toBe(false);
		});
		it('returns false for other types', () => {
			expect(isEmpty(0)).toBe(false);
			expect(isEmpty(false)).toBe(false);
		});
	});

	describe('isValidMaskFormat', () => {
		it('returns false for undefined or empty string', () => {
			expect(isValidMaskFormat(undefined)).toBe(false);
			expect(isValidMaskFormat('')).toBe(false);
		});
		it('returns false if string contains underscore', () => {
			expect(isValidMaskFormat('12_34')).toBe(false);
		});
		it('returns true if string does not contain underscore', () => {
			expect(isValidMaskFormat('1234')).toBe(true);
			expect(isValidMaskFormat('abc')).toBe(true);
		});
	});

	describe('isNumber', () => {
		it('returns true for finite numbers', () => {
			expect(isNumber(0)).toBe(true);
			expect(isNumber(123.456)).toBe(true);
			expect(isNumber(-987)).toBe(true);
		});
		it('returns false for non-numbers or infinite values', () => {
			expect(isNumber(NaN)).toBe(false);
			expect(isNumber(Infinity)).toBe(false);
			expect(isNumber(-Infinity)).toBe(false);
			expect(isNumber('123')).toBe(false);
			expect(isNumber(null)).toBe(false);
			expect(isNumber(undefined)).toBe(false);
			expect(isNumber({})).toBe(false);
		});
	});

	describe('isObject', () => {
		it('returns true for objects but not null', () => {
			expect(isObject({})).toBe(true);
			expect(isObject([])).toBe(true);
			expect(isObject(new Date())).toBe(true);
			expect(isObject(() => {})).toBe(false);
		});
		it('returns false for null and non-objects', () => {
			expect(isObject(null)).toBe(false);
			expect(isObject(123)).toBe(false);
			expect(isObject('abc')).toBe(false);
			expect(isObject(undefined)).toBe(false);
			expect(isObject(true)).toBe(false);
		});
	});

	describe('isPlainObject', () => {
		it('returns true for plain objects', () => {
			expect(isPlainObject({})).toBe(true);
			expect(isPlainObject({ a: 1 })).toBe(true);
		});
		it('returns false for arrays, functions, null, Date, Map, Set', () => {
			expect(isPlainObject([])).toBe(false);
			expect(isPlainObject(() => {})).toBe(false);
			expect(isPlainObject(null)).toBe(false);
			expect(isPlainObject(new Date())).toBe(false);
			expect(isPlainObject(new Map())).toBe(false);
			expect(isPlainObject(new Set())).toBe(false);
		});
		it('returns false for primitives', () => {
			expect(isPlainObject(123)).toBe(false);
			expect(isPlainObject('abc')).toBe(false);
			expect(isPlainObject(true)).toBe(false);
			expect(isPlainObject(undefined)).toBe(false);
		});
	});

	describe('isString', () => {
		it('returns true for strings', () => {
			expect(isString('')).toBe(true);
			expect(isString('hello')).toBe(true);
			expect(isString(String('abc'))).toBe(true);
		});
		it('returns false for non-strings', () => {
			expect(isString(123)).toBe(false);
			expect(isString(null)).toBe(false);
			expect(isString(undefined)).toBe(false);
			expect(isString({})).toBe(false);
		});
	});

	describe('isUndefined', () => {
		it('returns true for undefined', () => {
			expect(isUndefined(undefined)).toBe(true);
		});
		it('returns false for any other value', () => {
			expect(isUndefined(null)).toBe(false);
			expect(isUndefined(0)).toBe(false);
			expect(isUndefined('')).toBe(false);
			expect(isUndefined({})).toBe(false);
		});
	});
});
