import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormLabel } from '../../components/FormLabel';

describe('FormLabel component', () => {
    it('renders label text', () => {
        const { container } = render(<FormLabel label="Nombre" />);
        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('sets htmlFor when provided', () => {
        render(<FormLabel label="Correo" htmlFor="email" />);
        const label = screen.getByText('Correo');
        expect(label).toHaveAttribute('for', 'email');
    });
});


