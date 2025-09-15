import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonDanger } from '../../components/ButtonDanger';

describe('ButtonDanger component', () => {
    it('renders children content', () => {
        const { container } = render(<ButtonDanger>Eliminar</ButtonDanger>);
        expect(screen.getByText('Eliminar')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('applies danger classes', () => {
        render(<ButtonDanger>Danger</ButtonDanger>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-red-50');
        expect(button.className).toContain('border-red-500');
        expect(button.className).toContain('text-red-500');
    });
});


