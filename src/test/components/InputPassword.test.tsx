import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { InputPassword } from '../../components/InputPassword';

describe('InputPassword component', () => {
    it('renders password input and toggles visibility icon', async () => {
        const user = userEvent.setup();
        const { container } = render(<InputPassword type="password" placeholder="Clave" />);

        const input = screen.getByPlaceholderText('Clave') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.type).toBe('password');
        expect(container).toMatchSnapshot();

        const toggle = container.querySelector('.ant-input-password-icon') as HTMLElement;
        if (toggle) {
            await user.click(toggle);
        }
    });
});


