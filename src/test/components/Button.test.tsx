import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../../components/Button/Button';

describe('Button component', () => {
	it('renders children text', () => {
		const { container } = render(<Button>Click me</Button>);
		expect(screen.getByText('Click me')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('passes props to AntButton', () => {
		const { container } = render(<Button type="primary">Primary</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('ant-btn-primary');
		expect(container).toMatchSnapshot();
	});

	it('calls onClick handler when clicked', () => {
		const handleClick = vi.fn();
		const { container } = render(<Button onClick={handleClick}>Click</Button>);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(container).toMatchSnapshot();
	});

	it('renders disabled button', () => {
		const { container } = render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(container).toMatchSnapshot();
	});
});
