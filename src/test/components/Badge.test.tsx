import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '../../components/Badge/Badge';

describe('Badge component', () => {
	it('renders children and shows badge count', () => {
		const { container } = render(
			<Badge count={5}>
				<span data-testid="child">Inbox</span>
			</Badge>,
		);

		expect(screen.getByTestId('child')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders children without count', () => {
		const { container } = render(
			<Badge>
				<span data-testid="child">No count</span>
			</Badge>,
		);

		expect(screen.getByTestId('child')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows dot badge when dot prop is true', () => {
		const { container } = render(
			<Badge dot>
				<span data-testid="child">Dot badge</span>
			</Badge>,
		);

		expect(document.querySelector('.ant-badge-dot')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});
});
