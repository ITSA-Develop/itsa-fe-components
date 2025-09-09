import { capitalize, isRouteActive, toTitleCase } from '@/helpers/strings';

describe('Utils strings functions - tests', () => {
	describe('isRouteActive', () => {
		it('should return true if currentPath equals baseRoute without trailing slash', () => {
			expect(isRouteActive('/home', '/home')).toBe(true);
			expect(isRouteActive('/home/', '/home')).toBe(true);
			expect(isRouteActive('/home//', '/home')).toBe(true);
		});

		it('should return true if currentPath is a subroute of baseRoute', () => {
			expect(isRouteActive('/home/about', '/home')).toBe(true);
			expect(isRouteActive('/home/about/', '/home')).toBe(true);
		});

		it('should return false if it does not match', () => {
			expect(isRouteActive('/about', '/home')).toBe(false);
			expect(isRouteActive('/home2', '/home')).toBe(false);
		});
	});

	describe('capitalize', () => {
		it('should capitalize only the first letter and lowercase the rest', () => {
			expect(capitalize('hello')).toBe('Hello');
			expect(capitalize('HELLO')).toBe('Hello');
			expect(capitalize('hElLo')).toBe('Hello');
			expect(capitalize('')).toBe('');
		});
	});
});

describe('toTitleCase', () => {
	it('should convert each word to start with uppercase and rest lowercase', () => {
		expect(toTitleCase('hello world')).toBe('Hello World');
		expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
		expect(toTitleCase('hElLo wOrLd')).toBe('Hello World');
		expect(toTitleCase('')).toBe('');
	});
});
