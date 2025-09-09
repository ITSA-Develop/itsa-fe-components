import {
	addOrderParamIfMissing,
	buildQueryParams,
	cleanPath,
	clearURLParams,
	fillRoute,
	getQueryParam,
	updateURLParams,
} from '@/helpers/urls';

describe('URL and query param utils', () => {
	describe('getQueryParam', () => {
		it('gets the query parameter value if it exists', () => {
			const url = 'https://example.com/?foo=bar&baz=qux';
			expect(getQueryParam('foo', url)).toBe('bar');
			expect(getQueryParam('baz', url)).toBe('qux');
		});

		it('returns null if the parameter does not exist or url is invalid', () => {
			expect(getQueryParam('missing', 'https://example.com')).toBeNull();
			expect(getQueryParam('foo', 'not a url')).toBeNull();
		});
	});

	describe('buildQueryParams', () => {
		it('builds query string ignoring null, undefined, and empty values', () => {
			const filters = {
				foo: 'bar',
				baz: '',
				qux: null,
				test: 123,
				active: true,
			};

			const result = buildQueryParams(filters);
			expect(result).toContain('foo=bar');
			expect(result).toContain('test=123');
			expect(result).toContain('active=true');
			expect(result).not.toContain('baz=');
			expect(result).not.toContain('qux=');
		});
	});

	describe('updateURLParams', () => {
		it('updates the URL with the given parameters without reloading', () => {
			const replaceStateSpy = vi.spyOn(window.history, 'replaceState');

			updateURLParams({ foo: 'bar', num: 42 });

			expect(replaceStateSpy).toHaveBeenCalled();

			const firstCall = replaceStateSpy.mock.calls[0];
			expect(firstCall).toBeDefined();

			const calledUrl = replaceStateSpy.mock.calls[0]![2] as string;
			expect(calledUrl).toContain('?foo=bar');
			expect(calledUrl).toContain('num=42');
		});
	});

	describe('clearURLParams', () => {
		it('clears all parameters from the current URL', () => {
			const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
			clearURLParams();

			expect(replaceStateSpy).toHaveBeenCalled();

			const newUrl = replaceStateSpy.mock.calls[0]![2] as string | URL;
			expect(new URL(newUrl).search).toBe('');
		});
	});
	describe('addOrderParamIfMissing', () => {
		it('adds the order parameter if it does not exist', () => {
			expect(addOrderParamIfMissing('foo=1&bar=2', 'asc')).toContain('order=asc');
			expect(addOrderParamIfMissing('foo=1&order=desc', 'asc')).toContain('order=desc');
		});
	});

	describe('cleanPath', () => {
		it('removes /crear, /editar, or /detalles segments at the end of the path', () => {
			expect(cleanPath('/users/crear')).toBe('/users');
			expect(cleanPath('/items/editar')).toBe('/items');
			expect(cleanPath('/profile/detalles')).toBe('/profile');
			expect(cleanPath('/dashboard')).toBe('/dashboard');
		});
	});

	describe('fillRoute', () => {
		it('replaces dynamic parameters with values', () => {
			const route = '/users/:id/profile/:section';
			const params = { id: 42, section: 'settings' };
			expect(fillRoute(route, params)).toBe('/users/42/profile/settings');
		});

		it('removes dynamic parameters when their value is null or undefined', () => {
			const route = '/users/:id/profile/:section?';
			const params = { id: null, section: undefined };
			expect(fillRoute(route, params)).toBe('/users/profile');
		});

		it('adds query string when params.search is an object with keys', () => {
			const route = '/search';
			const params = { search: { q: 'term', page: 2 } };
			expect(fillRoute(route, params)).toContain('/search?q=term&page=2');
		});

		it('opens in a new tab if isOpenInNewTab is true and returns empty string', () => {
			const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

			const route = '/open/:id';
			const params = { id: 99 };
			const result = fillRoute(route, params, true);

			expect(openSpy).toHaveBeenCalledWith('/open/99', '_blank');
			expect(result).toBe('');

			openSpy.mockRestore();
		});

		it('normalizes multiple slashes to a single slash', () => {
			const route = '/path//:id///details';
			const params = { id: '123' };
			expect(fillRoute(route, params)).toBe('/path/123/details');
		});
	});

	describe('fillRoute edge cases', () => {
		it('removes optional segments with slash when parameter is null or undefined', () => {
			expect(fillRoute('/path/:foo?/details', { foo: null })).toBe('/path/details');
			expect(fillRoute('/path/:foo?/details', { foo: undefined })).toBe('/path/details');
		});

		it('keeps parameters with falsy values like false or 0', () => {
			expect(fillRoute('/item/:id', { id: 0 })).toBe('/item/0');
			expect(fillRoute('/item/:id', { id: false })).toBe('/item/false');
		});

		it('normalizes multiple consecutive slashes in resulting route', () => {
			const route = '/path//:id///details';
			const params = { id: '123' };
			expect(fillRoute(route, params)).toBe('/path/123/details');
		});
	});
});
