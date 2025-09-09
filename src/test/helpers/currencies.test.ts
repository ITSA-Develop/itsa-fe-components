import { getFormatCurrency } from '@/helpers/currencies';

describe('Utils currencies functions', () => {
	describe('getFormatCurrency', () => {
		it('formats positive numbers as USD currency with two decimals', () => {
			expect(getFormatCurrency(0)).toBe('$0.00');
			expect(getFormatCurrency(1234.5)).toBe('$1,234.50');
			expect(getFormatCurrency(1000000)).toBe('$1,000,000.00');
			expect(getFormatCurrency(12.3456)).toBe('$12.35');
		});

		it('formats negative numbers correctly', () => {
			expect(getFormatCurrency(-1234.56)).toBe('-$1,234.56');
		});

		it('formats small decimals correctly', () => {
			expect(getFormatCurrency(0.1)).toBe('$0.10');
			expect(getFormatCurrency(0.105)).toBe('$0.11');
		});
	});
});
