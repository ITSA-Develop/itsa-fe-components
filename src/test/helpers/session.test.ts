import { clearLocalStorage } from '@/helpers/session';

describe('Utils session functions - tests', () => {
	describe('clearLocalStorage', () => {
		beforeEach(() => {
			vi.restoreAllMocks();
		});

		it('does not call localStorage.clear if a key is provided', () => {
			const clearSpy = vi.spyOn(localStorage, 'clear');
			clearLocalStorage('anyKey');
			expect(clearSpy).not.toHaveBeenCalled();
		});

		it('does not call localStorage.removeItem if no key is provided', () => {
			const removeItemSpy = vi.spyOn(localStorage, 'removeItem');
			clearLocalStorage();
			expect(removeItemSpy).not.toHaveBeenCalled();
		});
	});
});
