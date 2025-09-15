import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ButtonAntd } from '../../components/ButtonAntd';

describe('ButtonAntd component', () => {
    it('renders children content', () => {
        const { container } = render(<ButtonAntd>Click me</ButtonAntd>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('passes props to Ant Button', () => {
        const onClick = vi.fn();
        const { container } = render(
            <ButtonAntd type="primary" disabled onClick={onClick}>
                Action
            </ButtonAntd>,
        );
        const button = screen.getByRole('button', { name: 'Action' });
        expect(button).toBeDisabled();
        expect(button).toHaveClass('ant-btn');
        expect(container).toMatchSnapshot();
    });
});


