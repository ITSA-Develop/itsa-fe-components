import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from '../../components/Alert/Alert';

describe('Alert component', () => {
	it('renders with message', () => {
		const { container } = render(<Alert message="Este es un mensaje" />);
		expect(screen.getByText('Este es un mensaje')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders with description', () => {
		const { container } = render(<Alert message="Mensaje" description="Descripción detallada" />);
		expect(screen.getByText('Descripción detallada')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders with different types', () => {
		const types = ['success', 'info', 'warning', 'error'] as const;

		types.forEach(type => {
			const { unmount } = render(<Alert message={`Mensaje ${type}`} type={type} />);
			expect(screen.getByText(`Mensaje ${type}`)).toBeInTheDocument();
			unmount();
		});
	});
});
