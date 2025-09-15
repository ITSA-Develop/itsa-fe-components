import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconMenu } from '../../components/IconMenu';

describe('IconMenu component', () => {
    it('renders home icon', () => {
        const { container } = render(<IconMenu icon="home" />);
        expect(container.firstChild).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    it('renders default icon for unknown key', () => {
        const { container } = render(<IconMenu icon="unknown" />);
        expect(container.firstChild).toBeTruthy();
    });
});


