import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSidebarStore } from '../../hooks/useSidebar';

describe('useSidebarStore', () => {
	it('has correct initial state', () => {
		const { result } = renderHook(() => useSidebarStore());

		expect(result.current.collapsed).toBe(false);
		expect(typeof result.current.setCollapsed).toBe('function');
	});

	it('can change collapsed state', () => {
		const { result } = renderHook(() => useSidebarStore());

		act(() => {
			result.current.setCollapsed(true);
		});

		expect(result.current.collapsed).toBe(true);

		act(() => {
			result.current.setCollapsed(false);
		});

		expect(result.current.collapsed).toBe(false);
	});

	it('shares state between hook instances', () => {
		const { result: result1 } = renderHook(() => useSidebarStore());
		const { result: result2 } = renderHook(() => useSidebarStore());

		act(() => {
			result1.current.setCollapsed(true);
		});

		expect(result1.current.collapsed).toBe(true);
		expect(result2.current.collapsed).toBe(true);
	});
});
