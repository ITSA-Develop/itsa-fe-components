import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorPage } from '../../components/ErrorPage/ErrorPage';

describe('ErrorPage component', () => {
	it('renders error and message texts', () => {
		const { container } = render(<ErrorPage error="404" message="Página no encontrada" handleClick={() => {}} />);

		expect(screen.getByText('404')).toBeInTheDocument();
		expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('calls handleClick when button is clicked', () => {
		const handleClick = vi.fn();
		render(<ErrorPage error="500" message="Error interno" handleClick={handleClick} />);

		const button = screen.getByRole('button', { name: /Ir al Inicio/i });
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
