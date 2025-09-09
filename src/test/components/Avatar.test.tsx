import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { Avatar } from '../../components/Avatar/Avatar';

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}),
	});
});

describe('Avatar component', () => {
	it('shows initials for two-word name', () => {
		const { container } = render(<Avatar name="John Doe" />);
		expect(screen.getByText('JD')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows initial for single-word name', () => {
		const { container } = render(<Avatar name="Alice" />);
		expect(screen.getByText('A')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders nothing if name is not provided', () => {
		const { container } = render(<Avatar />);
		expect(screen.queryByText(/./)).toBeNull();
		expect(container).toMatchSnapshot();
	});

	it('passes additional props to AntAvatar', () => {
		const { container } = render(<Avatar name="John Doe" size={64} />);
		const avatar = screen.getByText('JD').parentElement;
		expect(avatar).toBeDefined();
		expect(avatar).toHaveStyle({ width: '64px', height: '64px' });
		expect(container).toMatchSnapshot();
	});
});
