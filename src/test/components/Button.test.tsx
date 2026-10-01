import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../../components/Button';
import { ControlActionsProvider } from '../../HOC/ControlActions';

const renderButton = (ui: ReactElement) =>
	render(
		<ControlActionsProvider fnApiValidatePermissionAction={async () => true}>{ui}</ControlActionsProvider>,
	);

describe('Button component', () => {
	it('renders label text', () => {
		const { container } = renderButton(<Button label="Click me" />);
		expect(screen.getByText('Click me')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('passes props to AntButton', () => {
		const { container } = renderButton(<Button type="primary" label="Primary" />);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('ant-btn-primary');
		expect(container).toMatchSnapshot();
	});

	it('calls onClick handler when clicked', () => {
		const handleClick = vi.fn();
		const { container } = renderButton(<Button onClick={handleClick} label="Click" />);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(container).toMatchSnapshot();
	});

	it('asks for confirmation and runs onClick only after accept', async () => {
		const handleClick = vi.fn();
		renderButton(<Button confirm label="Guardar" onClick={handleClick} />);

		fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
		expect(handleClick).not.toHaveBeenCalled();

		await waitFor(() => {
			expect(screen.getByText('Confirmar acción')).toBeVisible();
		});

		fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
		await waitFor(() => {
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	it('uses the confirm title when one is provided', async () => {
		renderButton(<Button confirm="¿Eliminar este registro?" label="Eliminar" onClick={vi.fn()} />);

		fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

		await waitFor(() => {
			expect(screen.getByText('¿Eliminar este registro?')).toBeVisible();
		});
	});

	it('renders disabled button', () => {
		const { container } = renderButton(<Button disabled label="Disabled" />);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(container).toMatchSnapshot();
	});
});
