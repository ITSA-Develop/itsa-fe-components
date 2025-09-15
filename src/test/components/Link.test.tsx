import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from '../../components/Link/Link';

describe('Link component', () => {
    it('renders anchor with href and children', () => {
        const { container } = render(<Link href="https://example.com">Ir</Link>);
        const anchor = screen.getByRole('link', { name: 'Ir' });
        expect(anchor).toHaveAttribute('href', 'https://example.com');
        expect(container).toMatchSnapshot();
    });
});


