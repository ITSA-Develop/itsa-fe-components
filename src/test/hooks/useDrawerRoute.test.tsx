import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { useDrawerRoute } from '../../hooks/useDrawerRoute/useDrawerRoute';

function TestComponent({ showForm }: { showForm: boolean }) {
	const { isDrawerOpen } = useDrawerRoute(showForm);

	useEffect(() => {
		// For re-rendering on prop change
	}, [showForm]);

	return <div data-testid="drawer-state">{String(isDrawerOpen)}</div>;
}

describe('useDrawerRoute', () => {
	it('initially sets isDrawerOpen to false when showForm is false', () => {
		render(<TestComponent showForm={false} />);
		expect(screen.getByTestId('drawer-state').textContent).toBe('false');
	});

	it('initially sets isDrawerOpen to true when showForm is true', () => {
		render(<TestComponent showForm={true} />);
		expect(screen.getByTestId('drawer-state').textContent).toBe('true');
	});
});
