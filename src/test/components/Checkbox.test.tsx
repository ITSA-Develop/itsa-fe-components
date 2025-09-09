import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from '../../components/Checkbox/Checkbox';

describe('Checkbox component', () => {
	it('renders with label text', () => {
		const { container } = render(<Checkbox>Check me</Checkbox>);
		expect(screen.getByText('Check me')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('calls onChange when clicked', () => {
		const onChange = vi.fn();
		const { container } = render(<Checkbox onChange={onChange}>Click me</Checkbox>);
		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		expect(onChange).toHaveBeenCalled();
		expect(container).toMatchSnapshot();
	});

	it('is checked when defaultChecked is true', () => {
		const { container } = render(<Checkbox defaultChecked>Checked</Checkbox>);
		const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
		expect(checkbox.checked).toBe(true);
		expect(container).toMatchSnapshot();
	});

	it('can be disabled', () => {
		const { container } = render(<Checkbox disabled>Disabled</Checkbox>);
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeDisabled();
		expect(container).toMatchSnapshot();
	});
});
