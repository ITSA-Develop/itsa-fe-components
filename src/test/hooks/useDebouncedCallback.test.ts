import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';

describe('useDebouncedCallback', () => {
	it('calls trailing by default after delay', async () => {
		vi.useFakeTimers();
		const spy = vi.fn();
		const { result } = renderHook(() => useDebouncedCallback(spy, 200));

		act(() => {
			result.current.debouncedCallback('a');
			result.current.debouncedCallback('b');
		});

		expect(spy).not.toHaveBeenCalled();

		await act(async () => {
			vi.advanceTimersByTime(199);
		});

		expect(spy).not.toHaveBeenCalled();

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith('b');

		vi.useRealTimers();
	});

	it('supports leading without trailing', () => {
		vi.useFakeTimers();
		const spy = vi.fn();
		const { result } = renderHook(() =>
			useDebouncedCallback(spy, 200, { leading: true, trailing: false })
		);

		act(() => {
			result.current.debouncedCallback(1);
			result.current.debouncedCallback(2);
		});

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(1);

		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(spy).toHaveBeenCalledTimes(1);
		vi.useRealTimers();
	});

	it('supports leading and trailing together', () => {
		vi.useFakeTimers();
		const spy = vi.fn();
		const { result } = renderHook(() =>
			useDebouncedCallback(spy, 100, { leading: true, trailing: true })
		);

		act(() => {
			result.current.debouncedCallback('x');
			result.current.debouncedCallback('y');
		});

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith('x');

		act(() => {
			vi.advanceTimersByTime(100);
		});

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenLastCalledWith('y');
		vi.useRealTimers();
	});

	it('manages isLoading when enabled', () => {
		vi.useFakeTimers();
		const spy = vi.fn();
		const { result } = renderHook(() =>
			useDebouncedCallback(spy, 100, { trailing: true, enableLoading: true })
		);

		expect(result.current.isLoading).toBe(false);

		act(() => {
			result.current.debouncedCallback('a');
		});

		expect(result.current.isLoading).toBe(true);

		act(() => {
			vi.advanceTimersByTime(100);
		});

		expect(result.current.isLoading).toBe(false);
		vi.useRealTimers();
	});
});


