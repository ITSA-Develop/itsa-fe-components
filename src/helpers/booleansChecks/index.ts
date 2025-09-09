import { REGEX_FORMATS } from '@/constants';

export const isArray = <T = unknown>(value: unknown): value is T[] => Array.isArray(value);

export const isValidEmailFormat = (email?: string): boolean => !!email && REGEX_FORMATS.email.test(email);

export const isEmpty = (value: unknown): boolean => {
	if (value == null) return true;
	if (typeof value === 'string') return value.trim().length === 0;
	if (Array.isArray(value)) return value.length === 0;
	if (value instanceof Map || value instanceof Set) return value.size === 0;
	if (isPlainObject(value)) return Object.keys(value).length === 0;
	return false;
};

export const isValidMaskFormat = (inputValue?: string): boolean => !!inputValue && !inputValue.includes('_');

export const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

export const isObject = (value: unknown): value is object => typeof value === 'object' && value !== null;

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
	Object.prototype.toString.call(value) === '[object Object]';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isUndefined = (value: unknown): value is undefined => value === undefined;
