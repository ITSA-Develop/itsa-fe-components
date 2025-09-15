import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormLabelError } from '../../components/FormLabelError';

describe('FormLabelError component', () => {
    it('renders error label text', () => {
        const { container } = render(<FormLabelError label="Campo requerido" />);
        expect(screen.getByText('Campo requerido')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('sets htmlFor and id when provided', () => {
        render(<FormLabelError label="Error" htmlFor="field" id="field-error" />);
        const label = screen.getByText('Error');
        expect(label).toHaveAttribute('for', 'field');
        expect(label).toHaveAttribute('id', 'field-error');
        expect(label.className).toContain('text-red-500');
    });
});


