import { getCurrentDate } from '@/helpers/dates';
import dayjs from 'dayjs';

describe('Utils dates functions', () => {
	describe('getCurrentDate', () => {
		it('returns a valid ISO 8601 date string representing now', () => {
			const result = getCurrentDate();
			expect(typeof result).toBe('string');

			expect(dayjs(result).isValid()).toBe(true);

			const now = dayjs();
			const diffSeconds = now.diff(dayjs(result), 'second');
			expect(Math.abs(diffSeconds)).toBeLessThanOrEqual(2);
		});
	});
});
