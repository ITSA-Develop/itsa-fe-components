import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Select } from '../../components/Select';

describe('Select component', () => {
    it('renders and allows selecting an option', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Select
                options={[
                    { label: 'Uno', value: '1' },
                    { label: 'Dos', value: '2' },
                ]}
                placeholder="Seleccione"
            />,
        );

        // Open dropdown
        const combobox = container.querySelector('.ant-select') as HTMLElement;
        await user.click(combobox);
        // Antd renders list in portal; query by role
        const option = await screen.findByRole('option', { name: 'Dos' });
        await user.click(option);
        expect(container).toMatchSnapshot();
    });
});


